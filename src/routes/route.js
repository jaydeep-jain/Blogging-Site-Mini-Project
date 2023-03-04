const express = require('express')
const router = express.Router()
const AuthorController= require("../Controller/AuthorController")
const BlogController= require("../Controller/BlogController")
const middleware= require("../middlewares/auth")
const BlogModel = require('../models/BlogModel')

router.get("/test-me",function(req,res){
    res.send("api testing")
})


router.post("/author", AuthorController.createAuthor)
router.post("/login", AuthorController.authorlogin)


router.post("/createBlog",middleware.auth, BlogController.createBlog)
router.get("/filteredBlogs",middleware.auth, BlogController.getBlogs)
router.put("/blogs/:blogId",middleware.auth, BlogController.updateBlog)
router.delete("/blogs/:blogId",middleware.auth, BlogController.DeleteBlog)
router.delete("/blogs",middleware.auth, BlogController.deleteByQuery)


router.post("/blog", async function(req, res){
    let forupdate= await BlogModel.updateMany({isDeleted:true},{isDeleted:false})
    res.send(forupdate)
})

module.exports = router 