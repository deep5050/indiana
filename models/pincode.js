const mongoose = require('mongoose')
const pincodeSchema = new mongoose.Schema({
    "PostOfficeName":{
        type: String,
        required:true
    },
    "Pincode":{
        type: String,
        required:true
    },
    "City":{
        type:String,
        required:true
    },
    "District":{
        type: String,
        required:true
    },
    "State":{
        type:String,
        required:true
    }
},{collection:"pincode"})
module.exports = mongoose.model('pincodeModel',pincodeSchema);