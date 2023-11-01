import mongoose from 'mongoose';
const colorSchema = require('./colorSchema');
const typeSchema = require('./typeSchema');
const additionPriceSchema = require('./addtionPriceSchema');

const { Schema } = mongoose;

const optionSchema = new Schema({
    color:[colorSchema],
    type:[typeSchema],
    additionPrice: [additionPriceSchema]
});

const Option = mongoose.model('Option', optionSchema);

export default Option;
