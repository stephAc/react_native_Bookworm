import httpStatus from 'http-status-codes';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname.substring(
        0,
        file.originalname.indexOf('.'),
      )}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage }).single('file');

export default function multerHandle(req, res, next) {
  upload(req, req, (err) => {
    if (err instanceof multer.MulterError) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'File upload failed' });
    } else if (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'File upload failed' });
    }
    next();
  });
}
