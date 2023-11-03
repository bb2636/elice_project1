import { Car } from '../db/models/cars/cars-model.js';

export default class CarService {
    //상품 등록
    async CarUp({carName, carPrice, img,speed,mileage,fuel,carId,option,category}) {
        const car = await Car.create({carName, carPrice, img,speed,mileage,fuel,carId,option,category});
        try{
            if(!carName || !carPrice || !img || !speed || !mileage || !fuel || !carId){
                return {message : "MISSING_FIELD"}
            }
            const existCar = await Car.findOne({carId: car.carId});
            if(existCar != null){
                return {message: "DUPLICATED"}; //carId중복
            }
            const newCar = await Car.create(car);
            return {message : "SUCCESS", car: newCar};
        }catch(err){
            return err;
        }
    }
    //전체 상품 조회
    async getAllCarsInfo () {
        try {
            const allCars = await Car.find({}, 
                { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1});
            if(allCars) {
                return { message: "SUCCESS", users:allCars };
            } else {
                return { message: "NO_CARS", };
            }
        } catch(err) {
            return err;
        }
    }
}
