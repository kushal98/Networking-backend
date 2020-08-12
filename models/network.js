var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var networkSchema = new Schema({
    name : String,
    mobno : Number,
    email : String,
    profession : String,
    place : String,
    state : String,
});


module.exports = mongoose.model('Network' , networkSchema);
