// Import required modules
import path from 'path';
import fs from 'fs';
import mimeTypes from 'mime-types';
import { exec } from 'child_process';
import axios from 'axios';
import ffmpeg from 'ffmpeg';
import * as Sentry from '@sentry/node';
import { AppError } from './AppError';
import { Logger } from './logger';
import { CheckIsValidContact } from './CheckIsValidContact';
import { ListWhatsAppsService } from './ListWhatsAppsService';

// Define the public folder
const publicFolder = path.join(__dirname, '..', '..', 'public');

// Function to process audio
async function processAudio(audioFilePath: string): Promise<string> {
    const outputFilePath = path.join(publicFolder, `${new Date().getTime()}.mp3`);

    return new Promise((resolve, reject) => {
        exec(`${ffmpeg} -i ${audioFilePath} -q:a 0 -map a ${outputFilePath}`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(outputFilePath);
            }
        });
    });
}

// Function to convert audio to OGG format
async function convertAudioToOgg(audioFilePath: string): Promise<string> {
    const outputFilePath = path.join(publicFolder, `${new Date().getTime()}.ogg`);

    return new Promise((resolve, reject) => {
        exec(`ffmpeg -i ${audioFilePath} -c:a libvorbis ${outputFilePath}`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(outputFilePath);
            }
        });
    });
}

// Type definition for the message options
interface MessageOptions {
    video?: Buffer;
    caption?: string;
    fileName?: string;
    audio?: Buffer;
    mimetype?: string;
    document?: Buffer;
    image?: Buffer;
    ptt?: boolean;
}

// Function to get message options based on media type
async function getMessageOptions(
    fileName: string,
    filePath: string,
    caption?: string,
    fallbackCaption?: string
): Promise<MessageOptions | null> {
    const mimeType = mimeTypes.lookup(filePath);
    const actualCaption = caption || fallbackCaption;

    if (!mimeType) {
        throw new Error('Invalid MIME type');
    }

    const mediaType = mimeType.split('/')[0];

    try {
        switch (mediaType) {
            case 'video':
                return {
                    video: fs.readFileSync(filePath),
                    caption: actualCaption,
                    fileName
                };
            case 'audio':
                const oggPath = await convertAudioToOgg(filePath);
                return {
                    audio: fs.readFileSync(oggPath),
                    mimetype: 'audio/ogg',
                    ptt: true
                };
            case 'image':
                return {
                    image: fs.readFileSync(filePath),
                    caption: actualCaption
                };
            case 'application':
                return {
                    document: fs.readFileSync(filePath),
                    caption: actualCaption,
                    fileName,
                    mimetype: mimeType
                };
            default:
                return null;
        }
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return null;
    }
}

// Export functions as part of the module
export { processAudio, convertAudioToOgg, getMessageOptions };

// Define types for file and response
interface FileDetails {
    ext: string;
}

interface DownloadResult {
    fileName: string;
    filePath: string;
}

// Function to download a file and return its name and path
async function downloadFileAndGetName(url: string): Promise<DownloadResult | null> {
    const logger = new Logger();

    try {
        // Download the file using axios
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data, 'binary');

        // Generate a unique file name and path
        const ext = 'mp4'; // You could get this dynamically
        const fileName = `${Date.now()}.${ext}`;
        const filePath = path.join(__dirname, '..', 'public', fileName);

        // Save the file to the file system
        fs.writeFileSync(filePath, fileBuffer);
        logger.info(`File saved successfully at ${filePath}`);

        return { fileName, filePath };
    } catch (error) {
        logger.error('Failed to download file', error);
        return null;
    }
}

// Example usage of download function
const downloadExample = async () => {
    const url = 'https://example.com/video.mp4';
    const result = await downloadFileAndGetName(url);
    if (result) {
        console.log('Downloaded file:', result.fileName);
    }
};

downloadExample();

// Message and media handling example
interface MediaInfo {
    whatsappId: string;
    whatsappType: string;
    numbers: string[];
    message: string;
    mediaUrl?: string;
    mediaLocal?: string;
}

// Function to send media
async function sendMedia(mediaInfo: MediaInfo): Promise<void> {
    const logger = new Logger();

    try {
        // Fetch the media file
        const { filePath } = await downloadFileAndGetName(mediaInfo.mediaUrl || '');

        if (!filePath) {
            throw new Error('Failed to download media');
        }

        // Simulate sending the media (e.g., to a chat or service)
        logger.info(`Sending media from ${filePath} with message: ${mediaInfo.message}`);
    } catch (error) {
        logger.error('Failed to send media', error);
    }
}

// Example usage of sending media
const sendExample = async () => {
    const mediaInfo: MediaInfo = {
        whatsappId: '12345',
        whatsappType: 'personal',
        numbers: ['+1234567890'],
        message: 'Hello! Here is your media.',
        mediaUrl: 'https://example.com/image.png'
    };

    await sendMedia(mediaInfo);
};

sendExample();

// Define types for bulk messaging
interface BulkMessageData {
    whatsappId: string;
    whatsappType: string;
    numbers: string[];
    message: string;
    mediaUrl?: string;
    tenantId: string;
    ticketId: string;
}

// Bulk messaging function
async function bulkMessaging(data: BulkMessageData): Promise<void> {
    const logger = new Logger();

    try {
        // Fetch WhatsApp account information
        const whatsAppService = await ListWhatsAppsService(data.tenantId);
        const selectedWhatsApp = whatsAppService.find(
            (account) => account.id === parseInt(data.whatsappId, 10)
        );

        if (!selectedWhatsApp) {
            throw new AppError('WhatsApp account not found', 404);
        }

        // Loop through each number in the list
        for (const number of data.numbers) {
            try {
                // Validate the contact
                const isValidContact = await CheckIsValidContact(number, data.tenantId);

                if (!isValidContact) {
                    logger.warn(`Invalid contact: ${number}`);
                    continue; // Skip invalid contact
                }

                // Simulate sending a message or media
                logger.info(`Sending message to ${number}: ${data.message}`);

                // Optionally, handle media sending (similar to the earlier example)
                if (data.mediaUrl) {
                    const { filePath } = await downloadFileAndGetName(data.mediaUrl);
                    logger.info(`Sending media from ${filePath} to ${number}`);
                }
            } catch (contactError) {
                logger.error(`Failed to process contact ${number}`, contactError);
            }
        }

        logger.info(`Bulk messaging completed for WhatsApp ID ${data.whatsappId}`);

    } catch (error) {
        logger.error('Bulk messaging failed', error);
    }
}

// Example usage of bulk messaging
const exampleBulkMessageData: BulkMessageData = {
    whatsappId: '12345',
    whatsappType: 'personal',
    numbers: ['+1234567890', '+9876543210'],
    message: 'Hello! This is a bulk message.',
    mediaUrl: 'https://example.com/image.png',
    tenantId: 'tenant123',
    ticketId: 'ticket456'
};

bulkMessaging(exampleBulkMessageData);
