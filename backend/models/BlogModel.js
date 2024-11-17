import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    BlogImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
        },
    },

    category:{
        type:String,
        required: true
    },
    about:{
        type:String,
        required:true,
        minLength:[150,"Should have atleast 150 characters"]
    },
    adminName:{
        type:String,
    },
    adminPhoto:{
        type:String,
    },
    
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
});
export const Blog = mongoose.model("Blog", BlogSchema);