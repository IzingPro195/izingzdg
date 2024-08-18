'use strict';

// Importação dos serviços necessários
const socketZPRO = require('../libs/socketZPRO');
const AdminListChatFlowServiceZPRO = require('../services/AdminListChatFlowServiceZPRO');
const AdminListSettingsServiceZPRO = require('../services/AdminListSettingsServiceZPRO');
const AdminListTenantsServiceZPRO = require('../services/AdminListTenantsServiceZPRO');
const AdminListUsersServiceZPRO = require('../services/AdminListUsersServiceZPRO');
const AdminListChannelsServiceZPRO = require('../services/AdminListChannelsServiceZPRO');
const AdminUpdateUserServiceZPRO = require('../services/AdminUpdateUserServiceZPRO');
const UpdateSettingServiceZPRO = require('../services/UpdateSettingServiceZPRO');
const CreateWhatsAppServiceZPRO = require('../services/CreateWhatsAppServiceZPRO');

// Função para listar usuários
const indexUsers = async (req, res) => {
    const { searchParam, pageNumber } = req.body;
    const query = { searchParam, pageNumber };

    try {
        const { users, count, hasMore } = await AdminListUsersServiceZPRO.list(query);
        return res.status(200).json({ users, count, hasMore });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const payload = { name, userId };

    try {
        const updatedUser = await AdminUpdateUserServiceZPRO.update(payload);
        const io = socketZPRO.getIO();

        if (updatedUser) {
            io.emit(`${updatedUser.tenantId}:user`, {
                action: 'USER_UPDATED',
                user: updatedUser
            });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para listar tenants
const indexTenants = async (req, res) => {
    try {
        const tenants = await AdminListTenantsServiceZPRO.list();
        return res.status(200).json(tenants);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para listar fluxos de chat
const indexChatFlow = async (req, res) => {
    const { tenantId } = req.params;

    try {
        const chatFlows = await AdminListChatFlowServiceZPRO.list({ tenantId });
        return res.status(200).json(chatFlows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para listar configurações
const indexSettings = async (req, res) => {
    const { tenantId } = req.params;

    try {
        const settings = await AdminListSettingsServiceZPRO.list(tenantId);
        return res.status(200).json(settings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para atualizar configurações
const updateSettings = async (req, res) => {
    const { tenantId } = req.params;
    const { key, value } = req.body;

    const payload = { key, value, tenantId };

    try {
        const updatedSetting = await UpdateSettingServiceZPRO.update(payload);
        const io = socketZPRO.getIO();

        io.emit(`${tenantId}:settings`, {
            action: 'SETTINGS_UPDATED',
            setting: updatedSetting
        });

        return res.status(200).json(updatedSetting);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para listar canais
const indexChannels = async (req, res) => {
    const { tenantId } = req.params;

    try {
        const channels = await AdminListChannelsServiceZPRO.list({ tenantId });
        return res.status(200).json(channels);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Função para criar um novo canal
const storeChannel = async (req, res) => {
    const {
        name,
        tenantId,
        tokenTelegram,
        instagramUser,
        instagramKey,
        type,
        wabaBSP,
        tokenAPI
    } = req.body;

    const payload = {
        name,
        status: 'CREATED',
        tenantId,
        tokenTelegram,
        instagramUser,
        instagramKey,
        type,
        wabaBSP,
        tokenAPI
    };

    try {
        const newChannel = await CreateWhatsAppServiceZPRO.create(payload);
        return res.status(201).json(newChannel);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Exportando todas as funções para uso em outros módulos
module.exports = {
    indexUsers,
    updateUser,
    indexTenants,
    indexChatFlow,
    indexSettings,
    updateSettings,
    indexChannels,
    storeChannel
};
