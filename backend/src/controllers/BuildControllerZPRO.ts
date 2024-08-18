import { Request, Response } from 'express';
import { buildFront } from '../services/buildServiceZPRO';
import AppErrorZPRO from '../errors/AppErrorZPRO';
import { logger } from '../utils/loggerZPRO';

interface UserProfile {
  profile: string;
}

export const handleBuild = (req: Request, res: Response): void => {
  const user = req.user as UserProfile;
  const superAdminProfile = 'superadmin';
  const noPermissionMessage = ':: ZDG :: ERR_NO_PERMISSION :: Build error:';

  if (user.profile !== superAdminProfile) {
    throw new AppErrorZPRO(noPermissionMessage, 403);
  }

  buildFront((error: any, stdout: string, stderr: string) => {
    if (error) {
      logger.warn(':: Z-PRO :: Build error:', stderr);
      res.sendStatus(500);
      return;
    }

    logger.warn(':: Z-PRO :: Build output:', stdout);
    res.sendStatus(200);
  });
};
