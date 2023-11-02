import mongoose from 'mongoose';
// import colorSchema from './colorSchema.js';
// import optionTypeSchema from './optionTypeSchema.js';
//import additionPriceSchema from './addtionPriceSchema.js';

const { Schema } = mongoose;

const optionSchema = new Schema({
    color:{
        type: String,
        default: "white",
    }, // variation : "white", "gray", "red", "black"
    optionType:{
        type: String,
        default: "light",
    }, //variation : "light", "sgniture", "special"
    additionPrice: {
        type: Number,
        default: 0,
    } //variation: 0, 6000000, 9000000
});

const Option = mongoose.model('Option', optionSchema);

export default Option;
