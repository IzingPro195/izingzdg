import express from 'express';
import multer from 'multer';
import isAuth from '../middleware/isAuth';
import * as TicketNotesController from '../controllers/TicketNotesController';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const ticketNotesRoutes = express.Router();

ticketNotesRoutes.post('/ticketNotes', isAuth, upload.array('medias'), TicketNotesController.store);
ticketNotesRoutes.get('/ticketNotes', isAuth, TicketNotesController.index);
ticketNotesRoutes.put('/ticketNotes/:ticketNotesId', isAuth, upload.array('medias'), TicketNotesController.update);
ticketNotesRoutes.delete('/ticketNotes/:ticketNotesId', isAuth, TicketNotesController.remove);
ticketNotesRoutes.get('/ticketNotes/:ticketId/logs', isAuth, TicketNotesController.showLogsNotes);

export default ticketNotesRoutes;
