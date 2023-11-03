import { Router } from 'express';
import CategoryService from '../services/category-service';
const CategoryService = new CategoryService;
const router = Router();

router.get('/:carId', async (req, res, next) => {
    const {carId} = req.params.carId;
    try{
        const result = await CategoryService.getAllCategory(carId);
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"카테고리 조회에 성공했습니다", category: result.category});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status:404, message: "존재하지 않는 카테고리입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});
router.post('/categoryup', async (req, res, next) => {
    const { carId, carType } = req.body;
    try {
        const result = await CategoryService.CategoryUp({ carId, carType });
        res.status(201).json({message:'category creating success',result});
    } catch (error) {
        console.error(error);
        res.status(err.status);
        res.json({ message: err.message });
    }
});

router.put('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    const { carType } = req.body; //id는 수정안함
    try {
        const result = await CategoryService.updateCategoryInfo(carId, carType);
        if(result.message = "SUCCESS"){
            res.status(201).json({message:'상품 등록 성공', category: result.category});
        }else if(result.message === "DUPLICATED"){
            throw {status:400, message: "이미 등록된 상품아이디 입니다"};
        }else if(result.message === "MISSING_FIELD"){
            throw {status:400, message: "상품아이디와 타입은 필수 요청 값입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    } catch (err) {
        res.status(err.status).json({message:err.message});
    }
});

router.delete('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    try {
        const category = await CategoryService.deleteCategoryInfo(carId);
        if(result.message === "SUCCESS"){
            res.status(200).json({message: "카테고리 삭제에 성공했습니다", category: result.category});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status: 404, message: "존재하지 않는 카테고리입니다"};
        }else{
            throw {status: 404, message: "unknown eror"}
        }
    } catch(err){
        res.status(err.status).json({message:err.message});
    }
});


export default router;