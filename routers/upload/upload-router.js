import { Router } from 'express';
import multer from 'multer';
import UploadService from '../../services/upload-service.js';

const uploadService = new UploadService;
const router = Router();

// 업로드 요청
router.post('/upload',
    async(req, res, next) => {
        try {
            
            const result = await uploadService.uploadAndGetURL(req.file);
            // res.json(result);
            // return;
            if (err instanceof multer.MulterError) {
                // Multer에서 발생한 오류 처리
                res.status(500).json(err);
            } else if (err) {
                // 그 외의 오류 처리
                res.status(500).json(err);
            }

            res.status(200).json('File uploaded successfully');
            
        } catch (err) {
            res.status(err.status).json({message:err.message});
        }
    }
);

export default router;