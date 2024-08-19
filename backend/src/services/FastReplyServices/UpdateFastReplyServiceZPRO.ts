'use strict';

import AppErrorZPRO from '../../errors/AppErrorZPRO';
import FastReplyZPRO from '../../models/FastReplyZPRO';

interface FastReplyData {
  key: string;
  message: string;
  media: string;
  voice: string;
  userId: number;
  tenantId: number;
}

interface UpdateFastReplyServiceProps {
  fastReplyData: FastReplyData;
  fastReplyId: number;
}

const UpdateFastReplyService = async ({
  fastReplyData,
  fastReplyId,
}: UpdateFastReplyServiceProps): Promise<any> => {
  const fields = ['key', 'message', 'media', 'voice', 'userId'];
  const errorMessages = {
    notFound: 'ERR_NO_FAST_REPLY_FOUND',
  };

  const { key, message, media, voice, userId, tenantId } = fastReplyData;

  // Find the fast reply
  const fastReply = await FastReplyZPRO.findOne({
    where: { id: fastReplyId, tenantId },
    attributes: ['id', ...fields],
  });

  if (!fastReply) {
    throw new AppErrorZPRO(errorMessages.notFound, 404);
  }

  // Update the fast reply
  await fastReply.update({
    key,
    message,
    media,
    voice,
    userId,
  });

  // Reload the fast reply with updated attributes
  await fastReply.reload({
    attributes: ['id', ...fields],
  });

  return fastReply;
};

export default UpdateFastReplyService;
