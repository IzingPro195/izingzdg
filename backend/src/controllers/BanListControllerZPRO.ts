'use strict';

// Importações necessárias
import * as Yup from 'yup';
import { getIO } from '../libs/socketZPRO';
import ListBanListServiceZPRO from '../services/BanListService/ListBanListServiceZPRO';
import CreateBanListServiceZPRO from '../services/BanListService/CreateBanListServiceZPRO';
import ShowBanListServiceZPRO from '../services/BanListService/ShowBanListServiceZPRO';
import UpdateBanListServiceZPRO from '../services/BanListService/UpdateBanListServiceZPRO';
import DeleteBanListServiceZPRO from '../services/BanListService/DeleteBanListServiceZPRO';
import DeleteAllBanListServiceZPRO from '../services/BanListService/DeleteAllBanListServiceZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';

// Função para listar banimentos
export const index = async (req: any, res: any) => {
    const { searchParam, pageNumber } = req.query;
    const { tenantId } = req.params;
    const query = { searchParam, pageNumber, tenantId };

    try {
        const { banList, count, hasMore } = await ListBanListServiceZPRO(query);
        return res.json({ banList, count, hasMore });
    } catch (error) {
        throw new AppErrorZPRO(error.message);
    }
};

// Função para criar banimentos
export const store = async (req: any, res: any) => {
    const { tenantId, id: userId } = req.params;
    const { number, whatsappId, groupId } = req.body;

    const schema = Yup.object().shape({
        groupId: Yup.string().required(),
        number: Yup.string().required(),
        userId: Yup.string().required(),
        tenantId: Yup.string().required(),
    });

    const banListItems = [];
    for (const group of groupId) {
        const data = { number, whatsappId, groupId: group.id, userId: parseInt(userId), tenantId };

        try {
            await schema.validate(data);
            const banListItem = await CreateBanListServiceZPRO(data);
            banListItems.push(banListItem);
        } catch (error) {
            throw new AppErrorZPRO(error.message);
        }
    }

    return res.status(201).json(banListItems);
};

// Função para exibir um banimento específico
export const show = async (req: any, res: any) => {
    const { banListId } = req.params;
    try {
        const banList = await ShowBanListServiceZPRO(banListId);
        return res.status(200).json(banList);
    } catch (error) {
        throw new AppErrorZPRO(error.message);
    }
};

// Função para atualizar um banimento
export const update = async (req: any, res: any) => {
    const { tenantId, id: userId } = req.params;
    const { banListId } = req.params;
    const data = { ...req.body, userId, tenantId };

    const schema = Yup.object().shape({
        groupId: Yup.string(),
        number: Yup.string(),
        userId: Yup.string().required(),
    });

    try {
        await schema.validate(data);
        const banList = await UpdateBanListServiceZPRO({ banListData: data, banListId });
        const io = getIO();

        io.emit('banlist:updated', { action: 'update', banList });
        return res.status(200).json(banList);
    } catch (error) {
        throw new AppErrorZPRO(error.message);
    }
};

// Função para remover um banimento específico
export const remove = async (req: any, res: any) => {
    const { tenantId } = req.params;
    const { banListId } = req.params;

    try {
        await DeleteBanListServiceZPRO(banListId, tenantId);
        const io = getIO();

        io.emit('banlist:deleted', { action: 'delete', banListId });
        return res.status(200).json({ message: 'Banlist deleted successfully' });
    } catch (error) {
        throw new AppErrorZPRO(error.message);
    }
};

// Função para remover todos os banimentos
export const removeAll = async (req: any, res: any) => {
    const { tenantId } = req.params;

    try {
        await DeleteAllBanListServiceZPRO(tenantId);
        const io = getIO();

        io.emit('banlist:deletedAll', { action: 'deleteAll' });
        return res.status(200).json({ message: 'All banlists deleted successfully' });
    } catch (error) {
        throw new AppErrorZPRO(error.message);
    }
};
