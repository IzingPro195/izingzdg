'use strict';

import loggerZPRO from '../utils/loggerZPRO';
import TicketZPRO from '../models/TicketZPRO';
import SettingZPRO from '../models/SettingZPRO';
import TenantZPRO from '../models/TenantZPRO';
import ShowTicketServiceZPRO from '../services/ShowTicketServiceZPRO';
import socketEmitZPRO from '../socketEmitZPRO';
import CreateMessageSystemServiceZPRO from '../services/CreateMessageSystemServiceZPRO';
import SendWABAMetaTextServiceZPRO from '../services/SendWABAMetaTextServiceZPRO';
import WhatsappZPRO from '../models/WhatsappZPRO';
import ContactZPRO from '../models/ContactZPRO';
import { v4 as uuidv4 } from 'uuid';

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(1000, 5000);

exports.autoCloseTickets = {
    async handle() {
        try {
            const tenants = await TenantZPRO.findAll({ order: [['id', 'ASC']] });
            for (const tenant of tenants) {
                const tenantId = tenant.id;

                const autoCloseSetting = await SettingZPRO.findOne({ where: { key: 'autoCloseTickets', tenantId } });
                const closeDelaySetting = await SettingZPRO.findOne({ where: { key: 'autoCloseMinutes', tenantId } });
                const closeMessageSetting = await SettingZPRO.findOne({ where: { key: 'autoCloseMessage', tenantId } });

                if (autoCloseSetting?.value === 'enabled') {
                    const pendingTickets = await TicketZPRO.findAll({ where: { tenantId, status: 'open' } });

                    for (const ticket of pendingTickets) {
                        if (ticket.lastMessageAt && !ticket.autoClosed) {
                            const now = Math.floor(new Date().getTime() / 1000);
                            const lastMessageTime = Math.floor(ticket.lastMessageAt.getTime() / 1000);
                            const delay = closeDelaySetting ? parseInt(closeDelaySetting?.value) * 60 : 30 * 60;

                            if (now - lastMessageTime > delay) {
                                const closeMessage = closeMessageSetting?.value || 'Seu atendimento foi encerrado.';

                                if (ticket.channel === 'whatsapp') {
                                    const messagePayload = {
                                        body: closeMessage,
                                        isGroup: false,
                                        fromMe: true,
                                        sendType: 'bot'
                                    };

                                    const uuid = uuidv4();

                                    const messageData = {
                                        body: messagePayload,
                                        ticketId: ticket.id,
                                        ticket,
                                        sendType: messagePayload.sendType,
                                        uuid
                                    };

                                    await CreateMessageSystemServiceZPRO.handle(messageData);

                                    const contact = await ContactZPRO.findOne({ where: { id: ticket.contactId } });
                                    const whatsapp = await WhatsappZPRO.findOne({ where: { id: ticket.whatsappId } });

                                    if (contact && whatsapp) {
                                        const showTicket = await ShowTicketServiceZPRO.handle({ id: ticket.id, tenantId: ticket.tenantId });
                                        const sendWABAMessage = new SendWABAMetaTextServiceZPRO();
                                        const messagePayload = {
                                            contactName: contact.name,
                                            whatsappName: whatsapp.name,
                                            message: closeMessage,
                                            ticket: showTicket,
                                            tenantId: showTicket.tenantId,
                                            uuid
                                        };

                                        await sendWABAMessage.send(messagePayload);
                                    }
                                }

                                try {
                                    await ticket.update({ status: 'closed', autoClosed: true });
                                    const showTicket = await ShowTicketServiceZPRO.handle({ id: ticket.id, tenantId: ticket.tenantId });
                                    socketEmitZPRO.handle({ tenantId: ticket.tenantId, action: 'ticket:updated', ticket: showTicket });
                                } catch (error) {
                                    loggerZPRO.warn('Erro ao fechar ticket automaticamente:', error);
                                }
                            }

                            await timer(rndInt);
                        }
                    }
                }
            }
        } catch (error) {
            loggerZPRO.warn('Erro ao processar fechamento automático de tickets:', error);
        }
    }
};
