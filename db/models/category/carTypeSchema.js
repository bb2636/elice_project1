import mongoose from 'mongoose';
const { Schema } = mongoose;

const carTypeSchema = new Schema({
  type:[
    {name: 'SUV/RV'},
    {name: 'Sedan'},
    {name: 'Electric'},
  ],
});

export default carTypeSchema;