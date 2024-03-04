import multer from 'multer';

const storage = multer.diskStorage({
  filename(req, file, cb) {
    const uniquePreffix = +new Date();
    const fileName = `${uniquePreffix}-${file.originalname}`;
    req.body.data.img_url = fileName;
    cb(null, fileName);
  },
});

export default storage;
