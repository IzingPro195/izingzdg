'use strict';

import * as Yup from 'yup';
import { Request, Response } from 'express';
import CreateAutoReplyServiceZPRO from '../services/AutoReplyServices/CreateAutoReplyServiceZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';
import ListAutoReplyServiceZPRO from '../services/AutoReplyServices/ListAutoReplyServiceZPRO';
import UpdateAutoReplyServiceZPRO from '../services/AutoReplyServices/UpdateAutoReplyServiceZPRO';
import DeleteAutoReplyServiceZPRO from '../services/AutoReplyServices/DeleteAutoReplyServiceZPRO';

// Store Auto Reply
export const store = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.body;

  if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
    throw new AppErrorZPRO('ERR_NO_PERMISSION', 403);
  }

  const newAutoReply = { ...req.body, tenantId };
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    action: Yup.string().required(),
    tenantId: Yup.number().required(),
    userId: Yup.number().required(),
  });

  try {
    await schema.validate(newAutoReply);
  } catch (error) {
    throw new AppErrorZPRO(error.message);
  }

  const autoReply = await CreateAutoReplyServiceZPRO(newAutoReply);
  return res.status(201).json(autoReply);
};

// List Auto Replies
export const index = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.body;
  const autoReplies = await ListAutoReplyServiceZPRO({ tenantId });
  return res.status(200).json(autoReplies);
};

// Update Auto Reply
export const update = async (req: Request, res: Response): Promise<Response> => {
  if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
    throw new AppErrorZPRO('ERR_NO_PERMISSION', 403);
  }

  const { tenantId } = req.body;
  const { autoReplyId } = req.params;
  const updateData = { ...req.body, tenantId, autoReplyId };

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    action: Yup.string().required(),
    userId: Yup.number().required(),
  });

  try {
    await schema.validate(updateData);
  } catch (error) {
    throw new AppErrorZPRO(error.message);
  }

  const updatedAutoReply = await UpdateAutoReplyServiceZPRO(updateData);
  return res.status(200).json(updatedAutoReply);
};

// Delete Auto Reply
export const remove = async (req: Request, res: Response): Promise<Response> => {
  if (req.body.profile !== 'admin' && req.body.profile !== 'super') {
    throw new AppErrorZPRO('ERR_NO_PERMISSION', 403);
  }

  const { tenantId } = req.body;
  const { autoReplyId } = req.params;

  await DeleteAutoReplyServiceZPRO({ id: autoReplyId, tenantId });
  return res.status(200).json({ message: 'Auto reply deleted' });
};
