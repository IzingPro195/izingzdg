import TicketNotes from '../../models/TicketNotes';
import User from '../../models/User';

interface ShowLogNotesTicketServiceParams {
    ticketId: number;
}

const ShowLogNotesTicketService = async ({ ticketId }: ShowLogNotesTicketServiceParams) => {
    const userAlias = 'user';
    const attributesToInclude = ['id', 'name'];
    const orderConfig = ['createdAt', 'DESC'];

    const ticketNotes = await TicketNotes.findAll({
        where: { ticketId },
        include: [{
            model: User,
            as: userAlias,
            attributes: attributesToInclude,
        }],
        order: [orderConfig],
    });

    return ticketNotes;
};

export default ShowLogNotesTicketService;
