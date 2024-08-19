import * as Yup from 'yup';
import AppError from '../errors/AppError';
import CreateFastReplyService from '../services/FastReplyServices/CreateFastReplyService';
import ListFastReplyService from '../services/FastReplyServices/ListFastReplyService';
import DeleteFastReplyService from '../services/FastReplyServices/DeleteFastReplyService';
import UpdateFastReplyService from '../services/FastReplyServices/UpdateFastReplyService';

export const store = async (req: any, res: any): Promise<any> => {
    const { tenantId } = req.body;
    
    if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
        throw new AppError('ERR_NO_PERMISSION', 403);
    }

    const fastReplyData = {
        ...req.body,
        userId: req.body.user.id,
        tenantId,
    };

    if (req.media) {
        fastReplyData.media = req.media.filename;
    }

    const schema = Yup.object().shape({
        key: Yup.string().required(),
        message: Yup.string().required(),
        userId: Yup.number().required(),
        tenantId: Yup.number().required(),
    });

    try {
        await schema.validate(fastReplyData);
    } catch (error) {
        throw new AppError(error.message, 400);
    }

    const fastReply = await CreateFastReplyService(fastReplyData);
    return res.status(201).json(fastReply);
};

export const index = async (req: any, res: any): Promise<any> => {
    const { tenantId } = req.body;
    const filters = { tenantId };

    const fastReplies = await ListFastReplyService(filters);
    return res.status(200).json(fastReplies);
};

export const update = async (req: any, res: any): Promise<any> => {
    const { tenantId } = req.body;

    if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
        throw new AppError('ERR_NO_PERMISSION', 403);
    }

    const updateData = {
        ...req.body,
        userId: req.body.user.id,
        tenantId,
    };

    if (req.media) {
        updateData.media = req.media.filename;
    }

    const schema = Yup.object().shape({
        key: Yup.string().required(),
        message: Yup.string().required(),
        userId: Yup.number().required(),
    });

    try {
        await schema.validate(updateData);
    } catch (error) {
        throw new AppError(error.message, 400);
    }

    const { fastReplyId } = req.params;
    const updatePayload = {
        id: fastReplyId,
        data: updateData,
    };

    const fastReply = await UpdateFastReplyService(updatePayload);
    return res.status(200).json(fastReply);
};

export const remove = async (req: any, res: any): Promise<any> => {
    const { tenantId } = req.body;

    if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
        throw new AppError('ERR_NO_PERMISSION', 403);
    }

    const { fastReplyId } = req.params;
    const deleteData = {
        id: fastReplyId,
        tenantId,
    };

    await DeleteFastReplyService(deleteData);

    return res.status(200).json({ message: 'Fast Reply deleted' });
};
