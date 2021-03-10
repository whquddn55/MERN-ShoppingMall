const mongoose = require('mongoose');

const productSchema = mongoose.Schema( {
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        maxLength: 50,
    },
    description : {
        type : String,
    },
    price: {
        Type : Number,
        default : 0,
    },
    images : {
        Type : Array,
        default : [],
    },
    sold : {
        type : Number,
        maxlength : 100,
        default : 0,
    },
    views : {
        type : Number,
        default : 0
    }
}, { timestamps : true});


let Product = mongoose.model('Product', productSchema);

module.exports = {Product};