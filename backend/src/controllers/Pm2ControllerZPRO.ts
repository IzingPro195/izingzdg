import { exec } from 'child_process';
import loggerZPRO from '../utils/loggerZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';

interface ApiData {
  user: {
    profile: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface Response {
  status: (code: number) => Response;
  send: (message: string) => Response;
}

const restartPM2 = (apiData: ApiData, res: Response): void => {
  const errorMessage = 'ERR_NO_PERMISSION: Admin profile required to restart PM2.';
  
  if (apiData.user.profile !== 'admin') {
    throw new AppErrorZPRO(errorMessage, 401);
  }

  const command = '/usr/bin/pm2 jlist';
  const envOptions = { env: process.env };

  exec(command, envOptions, (error, stdout, stderr) => {
    if (error) {
      loggerZPRO.warn(`Error listing PM2 processes: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }

    if (stderr) {
      loggerZPRO.warn(`Stderr while listing PM2 processes: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }

    let processList;
    try {
      processList = JSON.parse(stdout).map((proc: any) => proc.name);
    } catch (parseError) {
      loggerZPRO.warn(`Error parsing PM2 process list: ${parseError.message}`);
      return res.status(500).send(`Error parsing PM2 process list: ${parseError.message}`);
    }

    loggerZPRO.info(`Restarting PM2 processes: ${processList.join(', ')}`);

    processList.forEach((processName: string) => {
      exec(`/usr/bin/pm2 restart ${processName}`, envOptions, (restartError, restartStdout, restartStderr) => {
        if (restartError) {
          loggerZPRO.warn(`Error restarting PM2 process ${processName}: ${restartError.message}`);
          return;
        }

        if (restartStderr) {
          loggerZPRO.warn(`Stderr restarting PM2 process ${processName}: ${restartStderr}`);
          return;
        }

        loggerZPRO.info(`Successfully restarted PM2 process ${processName}: ${restartStdout}`);
      });
    });

    res.status(200).send('PM2 restart process started successfully.');
  });
};

export { restartPM2 };
