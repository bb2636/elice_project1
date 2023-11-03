import { Router } from 'express';
import { Car } from '../db/models/cars/cars-model.js';
import CarService from '../services/car-service.js';
const carService = new CarService;
const router = Router();

//상품 전체 조회
router.get('/', async(req,res,next)=>{
    try{
        const result = await carService.getAllCarsInfo();
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 전체 조회 성공",car:result.cars});
            return;
        }else{
            throw {status: 404, message: 'unknown error'};
        }
    }catch (error) {
        res.status(err.status).json({message:err.message});
    }
})
//상품 상세 조회
router.get('/:carId', async (req, res, next) => {
    const {carId} = req.params.carId;
    try{
        const result = await carService.getCarInfo(carId);
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 정보 조회에 성공했습니다", car: result.cars});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status:404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status:404, message: "unknow error"};
        }
    }catch (error) {
        res.status(err.status).json({message:err.message});
    }
});
//상품 등록
router.post('/carup', async (req, res, next) => {
    const { carName, carPrice, img, speed, mileage, fuel, option, category } = req.body;
    try {
        const result = await carService.CarUp({ carName, carPrice, img, speed, mileage, fuel, option, category });
        if(result.message = "SUCCESS"){
            res.status(201).json({message:'상품 등록 성공', result});
        }else if(result.message === "DUPLICATED"){
            throw {status:400, message: "이미 등록된 상품아이디 입니다"};
        }else if(result.message === "MISSING_FIELD"){
            throw {status:400, message: "상품 id, 이름, 가격, 이미지, 최대속력, 주행거리, 연비는 필수 요청 값입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    } catch (error) {
        res.status(err.status).json({message:err.message});
    }
});


router.put('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    const { carName, carPrice, img, speed, mileage, option, category } = req.body;
    try {
        const carToUpdate = await Car.findOne({ _id: carId });
        if (!carToUpdate) {
            return res.status(404).json({ message: 'Car not found' });
        }
        carToUpdate.carName = carName;
        carToUpdate.carPrice = carPrice;
        carToUpdate.img = img;
        carToUpdate.speed = speed;
        carToUpdate.mileage = mileage;
        carToUpdate.option = option;
        carToUpdate.category = category;
        await carToUpdate.save();

        res.status(200).json({ message: 'Car updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating car' });
    }
});

router.delete('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.findByIdAndDelete(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting car' });
    }
});


export default router;