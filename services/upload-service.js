import multer from 'multer';

// 파일을 저장할 디렉토리를 설정합니다.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

export default class UploadService {

    // 파일 업로드
    async uploadAndGetURL(file) {
        //...
        const result = multer({ storage: storage }).single(file.originalname);
        return result;
    }
}