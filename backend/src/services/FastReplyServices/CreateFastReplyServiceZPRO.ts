import FastReplyZPRO from '../../models/FastReplyZPRO';
import * as Yup from 'yup'; // Exemplo de biblioteca de validação

interface CreateFastReplyDTO {
  key: string;
  message: string;
  media: string | null;
  voice: string | null;
  userId: number;
  tenantId: number;
}

export const CreateFastReplyService = async ({
  key,
  message,
  media,
  voice,
  userId,
  tenantId,
}: CreateFastReplyDTO): Promise<FastReplyZPRO> => {
  // Esquema de validação usando Yup (opcional)
  const schema = Yup.object().shape({
    key: Yup.string().required(),
    message: Yup.string().required(),
    media: Yup.string().nullable(),
    voice: Yup.string().nullable(),
    userId: Yup.number().required(),
    tenantId: Yup.number().required(),
  });

  // Validação dos dados
  await schema.validate({ key, message, media, voice, userId, tenantId });

  try {
    // Criação da FastReply
    const fastReplyData = {
      key,
      message,
      media,
      voice,
      userId,
      tenantId,
    };

    const createdFastReply = await FastReplyZPRO.create(fastReplyData);
    return createdFastReply;
  } catch (error) {
    // Tratamento de erros
    throw new Error(`Erro ao criar FastReply: ${error.message}`);
  }
};
