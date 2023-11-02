import mongoose from 'mongoose';
const { Schema } = mongoose;
import Option from './option-model';
import Category from '../category/category-model';

const carSchema = new Schema({
	carName: { 
		type: String,
		required: true, 
	},
	carPrice: {
		type: Number,
		required: true,
	},
	img: { 
		type: String,
		required: true 
	},
	speed: {
		type: Number,
        required: true
	},
	mileage: {
		type: Number,
        required: true
	},
	carId: {
        type: Number,
        required: true
    },
    option: {
        type: Option
    },
    category: {
        type: Category
    },
});

const Car = mongoose.model('Cars', carSchema);
export { Car };
