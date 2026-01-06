import CustomErrorHandler from "../../ErrorHandlers/CustomError.handler.js";
import Comment from "../Models/comments/comment.schema.js";
import CommentModel from "../Models/comments/comments.model.js";
import Post from "../Models/posts/post.schema.js";
import UsersModule from "../Models/users/users.module.js";
import commentRouter from "../Routes/comments/comments.routes.js";

export default class CommentController{

    
        
      async  addCommentToPost(req,res,next){
            try {
                  const postId = req.params.id;
                  const userId = req.user.userID;
                  const text = req.body.text;

                    if(!text){
                    throw new CustomErrorHandler("Commnet must be required!");
                }

                //   const comment = CommentModel.addComment(text,userId,postId)

                const post = await Post.findById(postId);
                if(!post){
                    throw new CustomErrorHandler("Post not found")
                }

                const comment =await Comment.create({
                    text,
                    userId,
                    postId,
                })
              
                  return res.status(201).json({
                    success:true,
                    message:"Comment created Successfully",
                    data:comment

                  })
                
            } catch (error) {
                next(error);
                
            }
          
            

        }

       async getCommentToPost(req,res,next){
            try {
                // const comments = CommentModel.getComment()
                const comments = await Comment.find();
                res.status(200).json({
                    success:true,
                    message:"fetched all comments ",
                    data:comments
                })
                
            } catch (error) {
                next(error);
            }

        }
        
       async updateCommentToPost(req,res,next){
            try {
            const userId = req.user.userID;
            const commentId = req.params.id;
            const text = req.body.text;
            // const updateComment = CommentModel.updateComment(text,userId,commentId);
            const comment = await Comment.findById(commentId);
            if(!comment){
                throw new CustomErrorHandler("Comment not found",4010);
            }
            if(comment.userId.toString() !== userId){
                throw new CustomErrorHandler("User not authorized",404);
            }

            comment.text = text;
            await comment.save();


             return res.status(200).json({
                success:true,
                message:"comment Updated successfully",
                data:comment,
             })
                
            } catch (error) {
                next(error);

                
            }
          

        }

      async  deleteCommentToPost(req,res,next){
            try {
                 const userId = req.user.userID;
                 const commentId = req.params.id;
                //  CommentModel.deleteComment(userId,commentId);
                const comment = await Comment.findById(commentId);
                if(!comment){
                    throw new CustomErrorHandler("Comment not found",404);

                }
                if(comment.userId.toString() !== userId){
                    throw new CustomErrorHandler("not allowed",404);
                }

                await Comment.findByIdAndDelete(commentId);

            return res.status(200).json({
                success:true,
                message:"comment deleted successfully",
                
            })
            } catch (error) {
                next(error);
            }
           



        }

}