import AppError from '../../errors/AppError';
import TicketNotes from '../../models/TicketNotes';

interface UpdateTicketNotesServiceParams {
    ticketNotesData: {
        notes: string;
        ticketId: number;
        userId: number;
        tenantId: number;
        medias?: string[];
    };
    ticketNotesId: number;
}

const UpdateTicketNotesService = async ({
    ticketNotesData,
    ticketNotesId,
}: UpdateTicketNotesServiceParams) => {
    const { notes, ticketId, userId, tenantId, medias } = ticketNotesData;

    const ticketNote = await TicketNotes.findOne({
        where: {
            id: ticketNotesId,
            tenantId: tenantId,
        },
        attributes: ['id', 'notes', 'ticketId', 'userId', 'medias'],
    });

    if (!ticketNote) {
        throw new AppError('ERR_NO_TICKET_NOTES_FOUND', 404);
    }

    await ticketNote.update({
        notes,
        ticketId,
        userId,
        medias, // Atualizando as mídias
    });

    await ticketNote.reload({
        attributes: ['id', 'notes', 'ticketId', 'userId', 'medias'],
    });

    return ticketNote;
};

export default UpdateTicketNotesService;
