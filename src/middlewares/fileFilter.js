import {APIError} from '../utils';

const allowedMimetypes = ['png', 'jpg', 'jpeg'];
const MAX_FILE_SIZE = 5000000;

const fileFilter = (_, file, cb) => {
  let error;
  if (!allowedMimetypes.includes(file.mimetype)) {
    error = new APIError(400, 'Invalid file mimetype');
    cb(error, false);
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    error = new APIError(400, "file size can't be greater than 5MB");
    cb(error, false);
    return;
  }

  cb(null, true);
};

export default fileFilter;
