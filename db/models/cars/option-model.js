import mongoose from 'mongoose';
const colorSchema = require('./colorSchema');
const optionTypeSchema = require('./optionTypeSchema');
const additionPriceSchema = require('./addtionPriceSchema');

const { Schema } = mongoose;

const optionSchema = new Schema({
    color:[colorSchema],
    optionType:[optionTypeSchema],
    additionPrice: [additionPriceSchema]
});

const Option = mongoose.model('Option', optionSchema);

export default Option;
