const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema( {
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    }, 
    authorId: {
        type: ObjectId,
        ref: "Author",
        required:true, 
    }, 
    tags:[String], 
    category: {
        type:[String],
        required:true //examples: [technology, entertainment, life style, food, fashion]
    }, 
    subcategory:[String], // examples[technology-[web development, mobile development, AI, ML etc]], 
    isDeleted: {
        type:Boolean, 
        default: false
    }, 
    isPublished: {
        type:Boolean, 
        default: false
    },
    publishedAt:Date, 
    deletedAt:Date
},{ timestamps: true });


module.exports = mongoose.model('Blog', BlogSchema)



