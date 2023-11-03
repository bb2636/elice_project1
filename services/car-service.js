import { Car } from '../db/models/cars/cars-model.js';

export default class CarService {
    async CarUp({carName, carPrice, img,speed,mileage,fuel,carId,option,category}) {
        const car = await Car.create({carName, carPrice, img,speed,mileage,fuel,carId,option,category});
        try{
            if(!carName || !carPrice || !img || !speed || !mileage || !fuel || !carId){
                return {message : "Missing_Field"}
            }
            const existCar = await Car.findOne({carId: car.carId});
            if(existCar != null){
                return {message: "Duplicated"}; //carId중복
            }
            const newCar = await Car.create(car);
            return {message : "Success", car: newCar};
        }catch(err){
            return err;
        }
    }
}
