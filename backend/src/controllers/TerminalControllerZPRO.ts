import TerminalServiceZPRO from '../services/TerminalServiceZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';

interface ApiData {
  user: {
    profile: string;
  };
  body: {
    command: string;
  };
}

interface Response {
  status: (code: number) => Response;
  send: (data: any) => Response;
}

async function handleCommand(apiData: ApiData, res: Response): Promise<void> {
  if (apiData.user.profile !== 'superadmin') {
    throw new AppErrorZPRO('ERR_NO_PERMISSION: Superadmin profile required.', 403);
  }

  const { command } = apiData.body;

  try {
    const commandResult = await TerminalServiceZPRO.sendCommand(command);
    res.send({
      message: 'Command executed successfully.',
      output: commandResult.toString(),
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export { handleCommand };
