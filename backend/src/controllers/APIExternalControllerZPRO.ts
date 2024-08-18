import * as Yup from "yup";
import { Request, Response } from "express";
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import mimeTypes from 'mime-types';
import { exec } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';
import * as Sentry from '@sentry/node';
import { v4 as uuidv4 } from 'uuid';

import AppError from "../errors/AppError";
import ApiConfig from "../models/ApiConfig";
import Queue from "../libs/Queue";
import ShowWhatsAppService from "../services/WhatsappService/ShowWhatsAppService";
import { StartWhatsAppSession } from "../services/WbotServices/StartWhatsAppSession";
import { getWbot } from "../libs/wbot";

// Define public folder path
const publicFolder = path.resolve(__dirname, '..', '..', 'public');

// Interface for MessageDataRequest
interface MessageDataRequest {
  apiId: string;
  sessionId: number;
  body: string;
  number: string;
  media?: Express.Multer.File | string;
  externalKey: string;
  tenantId: number;
}

// Convert audio to OGG format
const convertAudioToOgg = async (inputFilePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputFileName = `${new Date().getTime()}.ogg`;
    const outputFilePath = path.join(publicFolder, outputFileName);

    ffmpeg(inputFilePath)
      .toFormat('ogg')
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .save(outputFilePath);
  });
};

// Process and handle audio files
const processAudio = async (inputFile: string): Promise<string> => {
  const outputFilePath = path.join(publicFolder, `${new Date().getTime()}.mp3`);
  
  return new Promise((resolve, reject) => {
    exec(`${ffmpeg.path} -i ${inputFile} -f mp3 ${outputFilePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(outputFilePath);
      }
    });
  });
};

// Get message options based on the file type
const getMessageOptions = async (
  fileName: string,
  filePath: string,
  mimeType: string | null,
  caption: string | null
): Promise<any> => {
  if (!mimeType) {
    throw new Error('MIME type is required.');
  }

  const fileType = mimeType.split('/')[0];

  let messageOptions: any;

  if (fileType === 'video') {
    messageOptions = {
      video: fs.readFileSync(filePath),
      caption: caption || undefined,
      fileName,
    };
  } else if (fileType === 'audio') {
    const oggFile = await convertAudioToOgg(filePath);
    messageOptions = {
      audio: fs.readFileSync(oggFile),
      mimetype: 'audio/ogg',
      ptt: true,
    };
  } else if (fileType === 'document') {
    messageOptions = {
      document: fs.readFileSync(filePath),
      caption: caption || undefined,
      fileName,
      mimetype: mimeType,
    };
  } else {
    messageOptions = {
      image: fs.readFileSync(filePath),
      caption: caption || undefined,
    };
  }

  return messageOptions;
};

// Download file and get the name
const downloadFileAndGetName = async (fileUrl: string): Promise<string | null> => {
  try {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(response.data, 'binary');
    
    const fileType = await import('file-type');
    const detectedType = await fileType.fromBuffer(fileBuffer);
    
    if (!detectedType) {
      throw new Error('Unable to determine file type');
    }

    const fileName = `downloaded_${Date.now()}.${detectedType.ext}`;
    const filePath = path.join(publicFolder, fileName);

    fs.writeFileSync(filePath, fileBuffer);
    
    console.log(`File downloaded and saved as ${fileName}`);
    
    return fileName;
  } catch (error) {
    console.error('Error downloading file:', error);
    Sentry.captureException(error);
    return null;
  }
};

// Send a message via API
export const sendMessageAPI = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId, sessionId } = req.APIAuth;
  const { apiId } = req.params;
  const media = req.file as Express.Multer.File;

  const APIConfig = await ApiConfig.findOne({
    where: {
      id: apiId,
      tenantId
    }
  });

  if (APIConfig?.sessionId !== sessionId) {
    throw new AppError("ERR_SESSION_NOT_AUTH_TOKEN", 403);
  }

  const newMessage: MessageDataRequest = {
    ...req.body,
    apiId,
    sessionId,
    tenantId,
    media
  };

  const schema = Yup.object().shape({
    apiId: Yup.string(),
    sessionId: Yup.number(),
    body: Yup.string().required(),
    number: Yup.string().required(),
    mediaUrl:
      Yup.string().url().nullable() ||
      Yup.object().shape({
        destination: Yup.string().required(),
        encoding: Yup.string().required(),
        fieldname: Yup.string().required(),
        filename: Yup.string().required(),
        mimetype: Yup.string().required(),
        originalname: Yup.string().required(),
        path: Yup.string().required(),
        size: Yup.number().required()
      }),
    externalKey: Yup.string().required(),
    tenantId: Yup.number().required()
  });

  try {
    await schema.validate(newMessage);
  } catch (error) {
    throw new AppError(error.message);
  }

  Queue.add("SendMessageAPI", newMessage);

  return res.status(200).json({ message: "Message added to queue" });
};

// Start WhatsApp session
export const startSession = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId, sessionId } = req.APIAuth;
  const { apiId } = req.params;

  const APIConfig = await ApiConfig.findOne({
    where: {
      id: apiId,
      tenantId
    }
  });

  if (APIConfig?.sessionId !== sessionId) {
    throw new AppError("ERR_SESSION_NOT_AUTH_TOKEN", 403);
  }

  const whatsapp = await ShowWhatsAppService({
    id: APIConfig.sessionId,
    tenantId: APIConfig.tenantId,
    isInternal: true
  });

  try {
    const wbot = getWbot(APIConfig.sessionId);
    const isConnectStatus = wbot.ws.isOpen;
    if (!isConnectStatus) {
      throw new Error("Necessário iniciar sessão");
    }
  } catch (error) {
    StartWhatsAppSession(whatsapp);
  }

  return res.status(200).json(whatsapp);
};
