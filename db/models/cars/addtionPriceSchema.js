const { Schema } = require('mongoose');

const additionPriceSchema = new Schema({
  color:[
    {name: 10000000},
    {name: 16000000},
    {name: 19000000},
  ],
});

module.exports = additionPriceSchema;