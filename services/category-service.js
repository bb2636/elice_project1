
import { Car } from "../db/models/cars/cars-model.js";

export default class CategoryService{
    //카테고리 등록
    async CategoryUp({carId, carType}){
        const category = {carId, carType};
        const existCategory = await category.findOne({carId:category.carId});
        if(existCategory != null){
            throw {message: "DUPLICATED"};
        }
        const newCategory = await category.create(category);
        return {message: "SUCCESS", category: newCategory};
    }
    //카테고리 전체조회
    async getAllCategory(carType){
        const allCategory = await Car.find(
            {category : carType},
            { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
        if(allCategory){
            return {message: "SUCCESS", category: allCategory};
        }
        if(allCategory.length > 0){
            throw {message: "NO_MATCHES"};
        }
    }
    //카테고리 수정
    async updateCategoryInfo(carId, data){
        const updateCategory = await Category.findOneAndUpdate(
            {carId: carId},
            {carType: data.carType},
            {new: true});
        if(updateCategory){
            return {message: "SUCCESS", category: updateCategory};
        }else{
            throw {message: "NO_MATCHES"};
        }
    }
    //카테고리 삭제
    async deleteCategoryInfo(carId){
        const deleteCategory = await Category.findOneAndDelete({carId:carId});
        if(deleteCategory){
            return {message: "SUCCESS"};
        }else{
            throw {message: "NO_MATCHES"};
        }
    }
}