
import express from 'express';
import PostController from '../../Controllers/post.controller.js';
import authUser from '../../Middleware/auth.middleware.js';
import uploads from '../../Middleware/upload.middleware.js';

const postController = new PostController();
const postRouter = express.Router()

postRouter.get('/all',authUser,postController.getAllPost);
postRouter.post('/',authUser,uploads.single('media'),postController.createNewPost);
postRouter.get('/:id',authUser,postController.getSpecificPost)
postRouter.post("/like/:id",authUser,postController.likeToggel)
postRouter.get('/like/all/:id',authUser,postController.allLikes);

export default postRouter;