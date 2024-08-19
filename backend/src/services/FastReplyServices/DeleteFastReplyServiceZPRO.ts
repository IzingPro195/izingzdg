'use strict';

import AppError from '../../errors/AppErrorZPRO';
import FastReply from '../../models/FastReplyZPRO';

interface DeleteFastReplyServiceProps {
  id: number;
  tenantId: number;
}

const DeleteFastReplyService = async ({
  id,
  tenantId
}: DeleteFastReplyServiceProps): Promise<void> => {
  try {
    const fastReply = await FastReply.findOne({
      where: {
        id: id,
        tenantId: tenantId
      }
    });

    if (!fastReply) {
      throw new AppError('ERR_NO_FAST_REPLY_FOUND', 404);
    }

    await fastReply.destroy();
  } catch (error) {
    throw new AppError('ERR_FAST_REPLY_DELETE_FAILED', 500);
  }
};

export default DeleteFastReplyService;
