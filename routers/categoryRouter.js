import { Router } from 'express';
import { Car } from '../db/models/cars/cars-model';
import CarService from '../services/car-service';
const carService = new CarService;
const router = Router();

router.get('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving category' });
    }
});
router.post('/', async (req, res, next) => {
    const { carId, carType } = req.body;
    try {
        const result = await carService.addNewCar({ carId, carType });
        res.status(201).json({message:'category creating success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category' });
    }
});

router.put('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    const { carType } = req.body; //id는 수정안함
    try {
        const carToUpdate = await Car.findOne({ _id: carId });
        if (!carToUpdate) {
            return res.status(404).json({ message: 'Category not found' });
        }
        carToUpdate.carType = carType;
        await carToUpdate.save();

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating category' });
    }
});

router.delete('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.findByIdAndDelete(carId);
        if (!car) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting category' });
    }
});


export default router;