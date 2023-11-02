import mongoose from 'mongoose';
const { Schema } = mongoose;

const optionTypeSchema = new Schema({
  color:[
    {name: 'light'},
    {name: 'sgniture'},
    {name: 'special'},
  ],
});

export default optionTypeSchema;