import ImportContactsServiceZPRO from '../services/ImportContactsServiceZPRO';

interface ApiData {
    tenantId: string;
    [key: string]: any;
}

interface Response {
    json: (data: any) => Response;
    status: (code: number) => Response;
}

const store = async (apiData: ApiData, res: Response): Promise<Response> => {
    const { tenantId } = apiData;

    await ImportContactsServiceZPRO(tenantId);

    const responseMessage = { message: 'Contacts imported successfully' };
    return res.status(200).json(responseMessage);
};

export { store };
