import TicketNotes from '../../models/TicketNotes';
import AppError from '../../errors/AppError';

interface DeleteTicketNotesServiceParams {
    id: number;
    tenantId: number;
}

const DeleteTicketNotesService = async ({
    id,
    tenantId,
}: DeleteTicketNotesServiceParams) => {
    const ticketNote = await TicketNotes.findOne({
        where: {
            id,
            tenantId,
        },
    });

    if (!ticketNote) {
        throw new AppError('ERR_NO_TICKET_NOTES_FOUND', 404);
    }

    try {
        await ticketNote.destroy();
    } catch (error) {
        throw new AppError('ERR_NO_TICKET_NOTES_FOUND', 500);
    }
};

export default DeleteTicketNotesService;
