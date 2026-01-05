import CommentModel from "../Models/comments/comments.model.js";
import UsersModule from "../Models/users/users.module.js";
import commentRouter from "../Routes/comments/comments.routes.js";

export default class CommentController{

    
        
        addCommentToPost(req,res,next){
            try {
                  const postId = req.params.id;
                  const userId = req.user.userID;
                  const text = req.body.text;
                  const comment = CommentModel.addComment(text,userId,postId)
                  return res.status(201).json({
                    success:true,
                    message:"Comment created Successfully",
                    data:comment

                  })
                
            } catch (error) {
                next(error);
                
            }
          
            

        }

        getCommentToPost(req,res,next){
            try {
                const comments = CommentModel.getComment()
                res.status(200).json({
                    success:true,
                    message:"fetched all comments ",
                    data:comments
                })
                
            } catch (error) {
                next(error);
            }

        }
        
        updateCommentToPost(req,res,next){
            try {
            const userId = req.user.userID;
            const commentId = req.params.id;
            const text = req.body.text;
            const updateComment = CommentModel.updateComment(text,userId,commentId)
             return res.status(200).json({
                success:true,
                message:"comment Updated successfully",
                data:updateComment,
             })
                
            } catch (error) {
                next(error);

                
            }
          

        }
        deleteCommentToPost(req,res,next){
            try {
                 const userId = req.user.userID;
                 const commentId = req.params.id;
                 CommentModel.deleteComment(userId,commentId)

            return res.status(200).json({
                success:true,
                message:"comment deleted successfully",
                
            })
            } catch (error) {
                next(error);
            }
           



        }

}