const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname:{
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true, 
        enum:["Mr", "Mrs", "Miss"]
    },
    email: {
        type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,],
        unique:true
    },
    password: {
        type:String,
        required:true
    } 

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)




