'use strict';

import AppError from '../errors/AppErrorZPRO';
import { MessageMedia } from 'whatsapp-web.js';
import { getWbot } from '../libs/wbotZPRO';
import ListWhatsAppsService from '../services/ListWhatsAppsService';
import CheckIsValidContact from '../services/CheckIsValidContactZPRO';
import Ticket from '../models/TicketZPRO';
import { pupaZPRO } from '../utils/pupaZPRO';
import ConvertMpegToMp4 from '../services/ConvertMpegToMp4ZPRO';
import socketEmitZPRO from '../services/socketEmitZPRO';
import Message from '../models/MessageZPRO';
import logger from '../utils/loggerZPRO';
import GetWbotMessage from '../services/GetWbotMessageZPRO';

type BulkRequest = {
  whatsappId: string;
  arrayNumbers: string[];
  message?: string;
  groups?: string[];
  media?: string;
  mediaUrl?: string;
  mediaDescription?: string;
  voice?: string;
  voiceUrl?: string;
  mediaLocal?: string;
  mediaLocalDescription?: string;
  voiceLocal?: string;
  min?: number;
  max?: number;
  tenantId: string;
  id?: string;
};

type Response = {
  status: string;
};

export const bulk = async (data: BulkRequest): Promise<Response> => {
  const {
    whatsappId,
    arrayNumbers,
    message,
    groups,
    media,
    mediaUrl,
    mediaDescription,
    voice,
    voiceUrl,
    mediaLocal,
    mediaLocalDescription,
    voiceLocal,
    min,
    max,
    tenantId,
  } = data;

  const whatsapp = await ListWhatsAppsService(tenantId);
  const wbot = getWbot(parseInt(whatsappId));

  if (!whatsapp) {
    throw new AppError('Invalid WhatsApp ID', 404);
  }

  try {
    for (const number of arrayNumbers) {
      if (message) {
        await wbot.sendMessage(`${number}@c.us`, message);
      }
      if (media && mediaUrl) {
        const mediaData = await MessageMedia.fromUrl(mediaUrl);
        await wbot.sendMessage(`${number}@c.us`, mediaData, { caption: mediaDescription });
      }
      if (voice && voiceUrl) {
        const voiceData = await MessageMedia.fromUrl(voiceUrl);
        await wbot.sendMessage(`${number}@c.us`, voiceData, { sendAudioAsVoice: true });
      }
    }
  } catch (error) {
    throw new AppError(`Bulk message failed: ${error.message}`, 500);
  }

  return { status: 'done' };
};

export const individual = async (data: BulkRequest): Promise<Response> => {
  const {
    whatsappId,
    number,
    message,
    media,
    mediaUrl,
    mediaDescription,
    voice,
    voiceUrl,
    mediaLocal,
    mediaLocalDescription,
    voiceLocal,
    tenantId,
  } = data;

  const whatsapp = await ListWhatsAppsService(tenantId);
  const wbot = getWbot(parseInt(whatsappId));

  if (!whatsapp) {
    throw new AppError('Invalid WhatsApp ID', 404);
  }

  const contact = await CheckIsValidContact(number, tenantId);
  if (!contact) {
    throw new AppError('Invalid contact', 400);
  }

  try {
    if (message) {
      await wbot.sendMessage(contact.id, message);
    }
    if (media && mediaUrl) {
      const mediaData = await MessageMedia.fromUrl(mediaUrl);
      await wbot.sendMessage(contact.id, mediaData, { caption: mediaDescription });
    }
    if (voice && voiceUrl) {
      const voiceData = await MessageMedia.fromUrl(voiceUrl);
      await wbot.sendMessage(contact.id, voiceData, { sendAudioAsVoice: true });
    }
  } catch (error) {
    throw new AppError(`Individual message failed: ${error.message}`, 500);
  }

  return { status: 'done' };
};

export const noRedis = async (data: BulkRequest): Promise<Response> => {
  // Implementation for noRedis function
  return { status: 'done' };
};
