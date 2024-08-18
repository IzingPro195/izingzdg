import TicketNotes from '../../models/TicketNotes';

interface ListTicketNotesServiceParams {
    tenantId: number;
}

const ListTicketNotesService = async ({ tenantId }: ListTicketNotesServiceParams) => {
    const orderConfig = ['createdAt', 'ASC'];
    const whereClause = { tenantId };

    const ticketNotes = await TicketNotes.findAll({
        where: whereClause,
        order: [orderConfig],
    });

    return ticketNotes;
};

export default ListTicketNotesService;
