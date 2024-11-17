import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlogs, updateBlog } from '../controller/BlogController.js';
import { isAdmin, isAuthenticated } from '../middleware/AuthUser.js';

const router = express.Router()

router.post("/create", isAuthenticated, isAdmin("admin") , createBlog)
router.delete("/delete/:id",isAuthenticated, isAdmin("admin") , deleteBlog)
router.get("/all-blogs", getAllBlogs)
router.get("/single-blogs/:id",isAuthenticated, getSingleBlogs)
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);

export default router;