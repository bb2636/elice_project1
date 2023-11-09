import CarService from "../../services/car-service.js";
import {validator_carup} from "../../middlewares/validator/validator-carup.js";
import { validator_admin } from "../../middlewares/validator/validator-admin.js";

import {Router} from 'express';

import multer from 'multer';
import path from "path";

const router = Router();
const carService = new CarService;

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

router.post("/",
    validator_admin,
    upload.single('file'),
    validator_carup,
    async (req,res,next) => {
        try {
            const result = await carService.CarUp(req.body, req.file.filename);
            if(result.message = "SUCCESS"){
                res.status(201).json({message:'상품 등록 성공', car: result.car});
            }else if(result.message === "DUPLICATED"){
                throw {status:400, message: "이미 등록된 상품아이디 입니다"};
            }
        } catch (err) {
            res.status(err.status).json({message:err.message});
        }
    }
);

export default router;