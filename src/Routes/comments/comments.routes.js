import express from 'express';
import CommentController from '../../Controllers/comments.controller.js';
import authUser from '../../Middleware/auth.middleware.js';
const commentController = new CommentController

const commentRouter = express.Router();

commentRouter.get('/',authUser,commentController.getCommentToPost);
commentRouter.post('/:id',authUser,commentController.addCommentToPost);
commentRouter.put('/:id',authUser,commentController.updateCommentToPost);
commentRouter.delete('/:id',authUser,commentController.deleteCommentToPost)



export default commentRouter;