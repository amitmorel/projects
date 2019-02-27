const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    record_name : { type : String, required : true },
    location    : { type : String, required : true },
    income      : { type : Boolean, required : true },
    amount      : { type : Number, required : true },
    details     : { type : String}
    // record_name : { type : String},
    // location    : { type : String },
    // income      : { type : Boolean },
    // amount      : { type : Number },
    // details     : { type : String}
}, {timestamps:true});


module.exports = mongoose.model('record',RecordSchema);