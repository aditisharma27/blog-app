import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/BlogModel.js";
import { v2 as cloudinary } from 'cloudinary';

//Create new blog
export const createBlog = async(req,res)=>{
    try {
        
//adding pic
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({message:" Blog Image not provided! "});
       }
       const {BlogImage} = req.files;
       const allowedFormats=["image/jpg","image/png","image/jpeg","image/webp"];
    
       if(!allowedFormats.includes(BlogImage.mimetype))
         {
             return res
                    .status(400)
                    .json({message: "Invalid photo format. Only jpg,jpeg,webp and png allowed!"});
         }
    
//adding other details
       const {title,category,about} = req.body;
    
        if(!title || !category|| !about )
         {
             return res
                    .status(400)
                    .json({message: "Please fill all the details."});
        }
    
//admin details fetching
       const adminName = req?.user?.name;
       const adminPhoto = req?.user?.photo?.url;
       const createdBy= req?.user?._id;

//Response from cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
         BlogImage.tempFilePath,
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
         console.log(cloudinaryResponse.error)
        }
   
    //getting/creating user details
        const blogData = {
            title,
            about,
            category,
            adminName, 
            adminPhoto, 
            createdBy,
            BlogImage:{
                   public_id:cloudinaryResponse.public_id,                   //cloudinary credential(id,url) access
                   url:cloudinaryResponse.url
                  },
         };
        const blog = await Blog.create(blogData);
        res.status(201).json({message:"Blog created successfully",blog });
        
    } 
    catch (error)
     {
        console.log(error)
        res.status(500).json({error:"Internal server error."})
     }
}

//Delete blog 
export const deleteBlog = async(req,res)=>{
    const {id}= req.params;
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(404).json({message:"Blog not found"})
    }
    await blog.deleteOne();
    res.status(200).json({message:"Blog deleted successfully"})
}    

//Getting all blogs
export const getAllBlogs = async(req,res)=>{
    const allBlogs = await Blog.find()
    res.status(200).json(allBlogs)
} 

//Get single blog
export const getSingleBlogs = async(req,res)=>{
    const{id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid id"})
    }
    const blog =await Blog.findById(id)
    if(!blog){
      return res.status(404).json({message:" Blog not found"})
    }
    res.status(200).json(blog);
}

//View my blog
export const getMyBlogs = async (req, res) => {
    const createdBy = req.user.id;
    const myBlogs = await Blog.find({ createdBy });
    console.log(createdBy)
    res.status(200).json(myBlogs);
  };

 //Edit Blogs
 export const updateBlog = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid blog id"})
    }
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body,{new: true});
    if(!updateBlog){
        return res.status(404).json({message:"Blog not found"})
    }
    res.status(200).json(updateBlog);
 } 
