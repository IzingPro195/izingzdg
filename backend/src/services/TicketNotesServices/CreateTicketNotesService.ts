import { TicketNotes } from '../../models/TicketNotes';

interface CreateTicketNotesServiceParams {
    notes: string;
    ticketId: number;
    userId: number;
    tenantId: number;
    medias?: string[];
}

const CreateTicketNotesService = async ({
    notes,
    ticketId,
    userId,
    tenantId,
    medias,
}: CreateTicketNotesServiceParams) => {
    const ticketNote = await TicketNotes.create({
        notes,
        ticketId,
        userId,
        tenantId,
        medias, // Adicionando mídias ao criar uma nota
    });

    return ticketNote;
};

export default CreateTicketNotesService;
