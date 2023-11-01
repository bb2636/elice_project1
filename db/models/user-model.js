import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { 
		type: String,
		required: true, 
	},
	email: {
		type: String,
		required: true,
	},
	password: { 
		type: String,
		required: true 
	},
	phoneNumber: {
		type: Number,
	},
	address: {
		type: String,
	},
	orders: [],
});

const User = mongoose.model('User', userSchema);
export { User };