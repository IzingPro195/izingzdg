import * as Yup from 'yup';
import AppError from '../errors/AppError';
import { logger } from '../utils/logger';
import socketEmit from '../helpers/socketEmit';
import CreateTicketNotesService from '../services/CreateTicketNotesService';
import ListTicketNotesService from '../services/ListTicketNotesService';
import DeleteTicketNotesService from '../services/DeleteTicketNotesService';
import UpdateTicketNotesService from '../services/UpdateTicketNotesService';
import ShowLogNotesTicketService from '../services/ShowLogNotesTicketService';
import ShowTicketService from '../services/ShowTicketService';
import CreateMessageSystemService from '../services/CreateMessageSystemService';
import DeleteMessageSystem from '../services/DeleteMessageSystem';
import Message from '../models/Message';
import TicketNotes from '../models/TicketNotes';
import path from 'path';

export const store = async (req: any, res: any) => {
    const { tenantId } = req.user;
    const data = {
        ...req.body,
        userId: req.user.id,
        tenantId,
        medias: req.files?.map((file: any) => path.relative(req.body.directory, file.path)) || [],
    };

    const schema = Yup.object().shape({
        notes: Yup.string().required(),
        ticketId: Yup.number().required(),
        userId: Yup.number().required(),
        tenantId: Yup.number().required(),
        medias: Yup.array().of(Yup.string()),
    });

    try {
        await schema.validate(data);
    } catch (err) {
        throw new AppError(err.message);
    }

    // Processo de criação de mensagem, se aplicável
    try {
        const ticketData = { id: req.body.ticketId, tenantId };
        const ticket = await ShowTicketService(ticketData);
        if (ticket) {
            const messageData = {
                messageType: ':: DigitalSac ::',
                messageSended: true,
                chatUpdated: true,
            };

            const createMessageData = {
                message: messageData,
                tenantId,
                ticket,
                userId: req.user.id,
                sendType: 'chat:update',
                messageType: ':: try CreateMessageSystemService',
                fromMe: req.body.fromMe,
            };

            await CreateMessageSystemService(createMessageData);
        }
    } catch (err) {
        logger.error('Failed to create message system service', err);
    }

    const ticketNotes = await CreateTicketNotesService(data);
    return res.status(201).json(ticketNotes);
};

export const update = async (req: any, res: any) => {
    const { tenantId } = req.user;
    const data = {
        ...req.body,
        userId: req.user.id,
        tenantId,
        medias: req.files?.map((file: any) => path.relative(req.body.directory, file.path)) || [],
    };

    const schema = Yup.object().shape({
        notes: Yup.string().required(),
        ticketId: Yup.number().required(),
        userId: Yup.number().required(),
        medias: Yup.array().of(Yup.string()),
    });

    try {
        await schema.validate(data);
    } catch (err) {
        throw new AppError(err.message);
    }

    // Atualiza a mensagem associada, se aplicável
    try {
        const message = await Message.findOne({ where: { id: req.body.messageId, tenantId } });
        if (message) {
            await message.update({ messageType: 'chat:update' });
            socketEmit({
                tenantId,
                sendType: 'message:update',
                message,
            });
        }
    } catch (err) {
        console.error(err);
    }

    const updateData = { notesData: data, ticketNotesId: req.body.ticketNotesId };
    const updatedTicketNotes = await UpdateTicketNotesService(updateData);
    return res.status(200).json(updatedTicketNotes);
};
