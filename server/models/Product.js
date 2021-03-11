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
        type : Number,
        default : 0,
    },
    images : {
        type : Array,
        default : [],
    },
    sold : {
        type : Number,
        maxlength : 100,
        default : 0,
    },
    continent : {
        type : Number,
        default : 1,
    },
    views : {
        type : Number,
        default : 0
    }
}, { timestamps : true});


let Product = mongoose.model('Product', productSchema);

module.exports = {Product};