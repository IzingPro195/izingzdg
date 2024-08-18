import * as Yup from 'yup';
import CreateApiConfigServiceZPRO from '../services/CreateApiConfigServiceZPRO';
import ListApiConfigServiceZPRO from '../services/ListApiConfigServiceZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';
import UpdateApiConfigServiceZPRO from '../services/UpdateApiConfigServiceZPRO';
import DeleteApiConfigServiceZPRO from '../services/DeleteApiConfigServiceZPRO';
import RenewApiConfigTokenServiceZPRO from '../services/RenewApiConfigTokenServiceZPRO';

interface ApiData {
  tenantId: string;
  id: string;
  apiId?: string;
  [key: string]: any;
}

interface Response {
  json: (data: any) => Response;
  status: (code: number) => Response;
}

const store = async (apiData: ApiData, res: Response): Promise<Response> => {
  const { tenantId, id } = apiData;

  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required(),
    sessionId: Yup.string().nullable().required(),
    urlServiceStatus: Yup.string().nullable().url().required(),
    urlMessageStatus: Yup.string().nullable().url().required(),
    userId: Yup.string().nullable().required(),
    tenantId: Yup.string().nullable().required(),
  });

  try {
    await validationSchema.validate(apiData);
  } catch (error) {
    throw new AppErrorZPRO(error.message);
  }

  const newApiConfig = await CreateApiConfigServiceZPRO(apiData);
  return res.status(200).json(newApiConfig);
};

const index = async (apiData: ApiData, res: Response): Promise<Response> => {
  const { tenantId } = apiData;

  const apiConfigList = await ListApiConfigServiceZPRO({ tenantId });
  return res.status(200).json(apiConfigList);
};

const update = async (apiData: ApiData, res: Response): Promise<Response> => {
  const { tenantId, id, apiId } = apiData;

  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required(),
    sessionId: Yup.string().nullable().required(),
    urlServiceStatus: Yup.string().nullable().url().required(),
    urlMessageStatus: Yup.string().nullable().url().required(),
    userId: Yup.string().nullable().required(),
    tenantId: Yup.string().nullable().required(),
    isActive: Yup.boolean().nullable().required(),
  });

  try {
    await validationSchema.validate(apiData);
  } catch (error) {
    throw new AppErrorZPRO(error.message);
  }

  const updatedConfig = await UpdateApiConfigServiceZPRO({ ...apiData, apiId });
  return res.status(200).json(updatedConfig);
};

const remove = async (apiData: ApiData, res: Response): Promise<Response> => {
  const { tenantId, apiId } = apiData;

  await DeleteApiConfigServiceZPRO({ apiId, tenantId });
  return res.status(200).json({ message: 'API Config Deleted' });
};

const renewTokenApi = async (apiData: ApiData, res: Response): Promise<Response> => {
  const { tenantId, id, apiId } = apiData;

  const validationSchema = Yup.object().shape({
    sessionId: Yup.string().nullable().required(),
    userId: Yup.string().nullable().required(),
    tenantId: Yup.string().nullable().required(),
  });

  try {
    await validationSchema.validate(apiData);
  } catch (error) {
    throw new AppErrorZPRO(error.message);
  }

  const newToken = await RenewApiConfigTokenServiceZPRO({ tenantId, id, apiId });
  return res.status(200).json(newToken);
};

export { store, index, update, remove, renewTokenApi };
