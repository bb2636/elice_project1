import mongoose from 'mongoose';
const { Schema } = mongoose;

const ColorSchema = new Schema({
  color:[
    {white: 'white'},
    {gray: 'gray'},
    {red: 'red'},
    {black: 'black'},
  ],
});

export default ColorSchema;