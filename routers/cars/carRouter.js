import { Router } from 'express';
import CarService from '../../services/car-service.js';
const carService = new CarService;
const router = Router();
//에러처리는 일단 router, service 다 수정해보고 next(err)로 바꿔보기..

//상품 전체 조회
router.get('/', async(req,res,next)=>{
    try{
        const result = await carService.getAllCarsInfo();
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 전체 조회 성공",car: result.car});
            return;
        }else{
            throw {status: 404, message: 'unknown error'};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
})
//상품 상세 조회
router.get('/:carId', async (req, res, next) => {
    const {carId} = req.params.carId;
    try{
        const result = await carService.getCarInfo(carId);
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 정보 조회에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status:404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});
//상품 등록
router.post('/carup', async (req, res, next) => {
    const { carName, carPrice, img, speed, mileage, fuel, option, category } = req.body;
    try {
        const result = await carService.CarUp({ carName, carPrice, img, speed, mileage, fuel, option, category });
        if(result.message = "SUCCESS"){
            res.status(201).json({message:'상품 등록 성공', car: result.car});
        }else if(result.message === "DUPLICATED"){
            throw {status:400, message: "이미 등록된 상품아이디 입니다"};
        }else if(result.message === "MISSING_FIELD"){
            throw {status:400, message: "상품 id, 이름, 가격, 이미지, 최대속력, 주행거리, 연비는 필수 요청 값입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    } catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


router.put('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    const {carName, carPrice, img,speed,mileage,fuel,option,category} = req.body;
    try{
        const result = await carService.updateCarInfo(carId, {carName, carPrice, img,speed,mileage,fuel,option,category});
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 수정에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status: 404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status: 404, message: "unknown error"};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});

router.delete('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    try {
        const result = await carService.deleteCarInfo(carId);
        if(result.message === "SUCCESS"){
            res.status(200).json({message: "상품 정보 삭제에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status: 404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status: 404, message: "unknown eror"}
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


export default router;