import * as Yup from "yup";
import AppError from "../errors/AppError";
import CreateTicketEvaluationService from "../services/CreateTicketEvaluationService";
import ListTicketEvaluationService from "../services/ListTicketEvaluationService";
import DeleteTicketEvaluationService from "../services/DeleteTicketEvaluationService";
import UpdateTicketEvaluationService from "../services/UpdateTicketEvaluationService";
import ShowLogEvaluationTicketService from "../services/ShowLogEvaluationTicketService";

// Type definitions
interface Request {
    body: {
        tenantId: string;
        id?: string;
    };
    params?: {
        ticketId?: string;
        ticketEvaluationId?: string;
    };
}

interface Response {
    status: (statusCode: number) => Response;
    json: (body: any) => Response;
}

// Store a new ticket evaluation
export const store = async (req: Request, res: Response): Promise<Response> => {
    const { tenantId } = req.body;
    const data = {
        ...req.body,
        userId: req.body.id,
        tenantId
    };

    const schema = Yup.object().shape({
        evaluation: Yup.string().required(),
        attempts: Yup.number().required(),
        ticketId: Yup.number().required(),
        userId: Yup.number().required(),
        tenantId: Yup.number().required(),
    });

    try {
        await schema.validate(data);
    } catch (error) {
        throw new AppError(error.message);
    }

    const ticketEvaluation = await CreateTicketEvaluationService(data);
    return res.status(201).json(ticketEvaluation);
};

// List ticket evaluations
export const index = async (req: Request, res: Response): Promise<Response> => {
    const { tenantId } = req.body;
    const filter = { tenantId };
    const evaluations = await ListTicketEvaluationService(filter);
    return res.status(200).json(evaluations);
};

// Update a ticket evaluation
export const update = async (req: Request, res: Response): Promise<Response> => {
    const { tenantId } = req.body;
    const data = {
        ...req.body,
        userId: req.body.id,
        tenantId
    };

    const schema = Yup.object().shape({
        evaluation: Yup.string().required(),
        attempts: Yup.number().required(),
        ticketId: Yup.number().required(),
        userId: Yup.number().required(),
    });

    try {
        await schema.validate(data);
    } catch (error) {
        throw new AppError(error.message);
    }

    const { ticketEvaluationId } = req.params!;
    const updateData = { data, ticketEvaluationId };
    const updatedEvaluation = await UpdateTicketEvaluationService(updateData);
    return res.status(200).json(updatedEvaluation);
};

// Remove a ticket evaluation
export const remove = async (req: Request, res: Response): Promise<Response> => {
    const { tenantId } = req.body;
    const { ticketEvaluationId } = req.params!;

    await DeleteTicketEvaluationService({ id: ticketEvaluationId, tenantId });
    return res.status(200).json({ message: "Ticket evaluation deleted successfully." });
};

// Show logs of a ticket evaluation
export const showLogsEvaluation = async (req: Request, res: Response): Promise<Response> => {
    const { ticketId } = req.params!;
    const logs = await ShowLogEvaluationTicketService({ ticketId });
    return res.status(200).json(logs);
};
