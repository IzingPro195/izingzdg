import path from 'path';
import multer from 'multer';
import { format } from 'date-fns';

// Define the public folder path
const publicFolder = path.resolve(__dirname, '..', '..', 'public');

// Multer storage configuration
export const storageConfig = {
  directory: publicFolder,
  storage: multer.diskStorage({
    destination: publicFolder,
    filename(req, file, cb) {
      let fileName: string;

      // Check if the file mimetype ends with 'xml'
      if (file.mimetype && file.mimetype.toLocaleLowerCase().endsWith('xml')) {
        // Use the original name for XML files
        fileName = file.originalname;
      } else {
        // For other files, format the filename with the current date
        const { originalname } = file;
        const ext = path.extname(originalname);
        const nameWithoutExt = originalname.replace(ext, '');
        const timestamp = format(new Date(), 'ddMMyyyyHHmmssSSS');
        fileName = `${nameWithoutExt}_${timestamp}${ext}`;
      }

      // Pass the filename to the callback
      cb(null, fileName);
    }
  })
};
