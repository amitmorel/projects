const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    title: String,
    type:String,
    image:String,
    description:String,
    price: Number,
    space: {
        description: String,
        guests:Number,
        beds:Number,
        bedrooms:Number
    },
    amenities:Array,
    bookings: Array,
    address: {
        country:String,
        city:String,
        street:String,
        Latitude:Number,
        Longitude:Number            
    },
    owner: { 
        imageUrl: String, 
        name:String ,
        joined: String,
        languages: String
    },
    rating: Number,
    reviewsCount:Number,
    reviews: [{
        id:Number,
        name: String,
        pic: String,
        date:String,
        content:String,
        rating:Number,
    }]
});

const RecordModel = mongoose.model('houses', RecordSchema);

module.exports = RecordModel;