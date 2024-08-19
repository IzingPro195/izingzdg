import express from 'express';
import isAuth from '../middlewares/isAuthZPRO';
import multer from 'multer';
import uploadConfig from '../config/uploadZPRO';
import * as FastReplyController from '../controllers/FastReplyControllerZPRO';

const router = express.Router();

// File upload configuration
const upload = multer({
  ...uploadConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
}).single('media');

// FastReply routes
router.post('/fastreply', isAuth, upload, FastReplyController.store);
router.get('/fastreply', isAuth, FastReplyController.index);
router.put('/fastreply/:fastReplyId', isAuth, upload, FastReplyController.update);
router.delete('/fastreply/:fastReplyId', isAuth, FastReplyController.remove);

export default router;
