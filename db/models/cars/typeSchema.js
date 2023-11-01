const { Schema } = require('mongoose');

const TypeSchema = new Schema({
  color:[
    {name: 'light'},
    {name: 'sgniture'},
    {name: 'special'},
  ],
});

module.exports = TypeSchema;