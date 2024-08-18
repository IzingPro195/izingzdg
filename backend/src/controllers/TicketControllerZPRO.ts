import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { getIO } from '../libs/socket';
import { v4 as uuidv4 } from 'uuid';
import Message from '../models/MessageZPRO';
import Ticket from '../models/TicketZPRO';
import ListTicketsService from '../services/ListTicketsServiceZPRO';
import ShowTicketService from '../services/ShowTicketServiceZPRO';
import UpdateTicketService from '../services/UpdateTicketServiceZPRO';
import CreateTicketService from '../services/CreateTicketServiceZPRO';
import DeleteTicketService from '../services/DeleteTicketServiceZPRO';
import ShowLogTicketService from '../services/ShowLogTicketServiceZPRO';
import CleanChatGptHistoryTicketService from '../services/CleanChatGptHistoryTicketServiceZPRO';
import CreateMessageSystemService from '../services/CreateMessageSystemServiceZPRO';
import UpdateChannelTicketService from '../services/UpdateChannelTicketServiceZPRO';
import UpdateChatbotTicketService from '../services/UpdateChatbotTicketServiceZPRO';
import SendWABAMetaTextService from '../services/SendWABAMetaTextServiceZPRO';
import pupa from '../utils/pupa';

export const index = async (req: Request, res: Response) => {
  const { tenantId, profile, id } = req.user;
  const {
    searchParam,
    pageNumber,
    status,
    date,
    showAll,
    withUnreadMessages,
    queuesIds,
    isNotAssignedUser,
    includeNotQueueDefined,
  } = req.body;

  const params = {
    searchParam,
    pageNumber,
    status,
    date,
    showAll,
    userId: id,
    withUnreadMessages,
    queuesIds,
    isNotAssignedUser,
    includeNotQueueDefined,
    tenantId,
    profile,
  };

  const ticketsData = await ListTicketsService.execute(params);

  if (!ticketsData) {
    return res.status(200).json({ tickets: [], count: 0, hasMore: false });
  }

  const { tickets, count, hasMore } = ticketsData;

  return res.status(200).json({ tickets, count, hasMore });
};

export const clear = async (req: Request, res: Response) => {
  const { tenantId } = req.user;
  const result = await CleanChatGptHistoryTicketService.execute({ tenantId });
  return res.status(200).json(result);
};

export const store = async (req: Request, res: Response) => {
  const { tenantId, userId, contactId, status, channel, channelId } = req.body;
  const params = { tenantId, userId, contactId, status, channel, channelId };
  const ticket = await CreateTicketService.execute(params);

  if (!userId) {
    const io = getIO();
    io.to(`${tenantId}:${ticket.id}`).emit(`${tenantId}:notification`, {
      action: 'ticket:create',
      ticket,
    });
  }

  return res.status(201).json(ticket);
};

export const show = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  const { tenantId } = req.user;

  const ticket = await ShowTicketService.execute({ id: ticketId, tenantId });

  const messages = await Message.findAll({
    where: { ticketId: ticket.id, fromMe: { [Op.eq]: null } },
  });

  ticket.setDataValue('messages', messages);

  return res.status(200).json(ticket);
};

export const update = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  const { tenantId, isTransference } = req.body;
  const params = Object.assign({}, req.body, { tenantId });

  const ticket = await UpdateTicketService.execute({
    ticketId,
    isTransference,
    userId: req.user.id,
    ...params,
  });

  return res.status(200).json(ticket);
};

export const updateChannel = async (req: Request, res: Response) => {
  const { tenantId } = req.user;
  const params = Object.assign({}, req.body, { tenantId });

  const tickets = await UpdateChannelTicketService.execute(params);

  return res.status(200).json(tickets);
};

export const updateChatbot = async (req: Request, res: Response) => {
  const { tenantId } = req.user;
  const { ticketId } = req.params;
  const params = Object.assign({}, req.body, { tenantId });

  const ticket = await UpdateChatbotTicketService.execute({
    ticketId,
    ...params,
  });

  return res.status(200).json(ticket);
};

export const remove = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  const { tenantId } = req.user;

  const ticket = await DeleteTicketService.execute({ id: ticketId, tenantId });

  const io = getIO();
  io.to(`${tenantId}:${ticket.id}`).emit(`${tenantId}:notification`, {
    action: 'ticket:delete',
    ticketId: ticket.id,
  });

  return res.status(200).json({ message: 'Ticket deleted' });
};
