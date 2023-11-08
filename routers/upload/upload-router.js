import { Router } from 'express';
const router = Router();

import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets/cars/'); // 업로드된 파일이 저장될 경로를 지정합니다.
    },
    filename: function(req, file, cb) {
        const extname = path.extname(file.originalname); // 원본 파일의 확장자를 가져옵니다.
       const filename = file.originalname.replace(extname, '').toLowerCase(); // 파일명을 설정합니다. 여기서는 확장자를 제외하고 소문자로 변환합니다.
        cb(null, filename + '-' + Date.now() + extname); // 저장할 파일명을 설정합니다. 이 예제에서는 파일명에 타임스탬프를 추가합니다.
    }
});

const upload = multer({ storage: storage });

// 업로드 요청
router.post('/',
    upload.single('file'),
    async(req, res, next) => {
        const { carName, carPrice, carId, mileage, fule, option, category, color} = req.body;
        res.json({
            message:"success",
            file: req.file,
            car: { carName, carPrice, carId, mileage, fule, option, category, color, img:`/images/${req.file.filename}`} });        
    }
);

export default router;