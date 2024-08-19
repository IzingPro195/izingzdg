'use strict';

import FastReplyZPRO from '../../models/FastReplyZPRO';

interface ListFastReplyServiceProps {
  tenantId: number;
}

const ListFastReplyService = async ({ tenantId }: ListFastReplyServiceProps): Promise<any> => {
  try {
    const orderParams = { key: 'id', value: 'ASC' };

    const result = await FastReplyZPRO.findAll({
      where: { tenantId },
      order: [[orderParams.key, orderParams.value]],
    });

    return result;
  } catch (error) {
    throw new Error('Error while fetching fast replies');
  }
};

export default ListFastReplyService;
