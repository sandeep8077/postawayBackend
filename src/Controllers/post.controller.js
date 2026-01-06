import CustomErrorHandler from "../../ErrorHandlers/CustomError.handler.js";
import PostModule from "../Models/posts/post.module.js";
import Post from "../Models/posts/post.schema.js";
// import User from "../Models/users/user.schema.js";

export default class PostController{


   async getAllPost(req,res,next){
        try {
        //  const posts = PostModule.getAll();
        const posts = await Post.find();
         return res.status(201).json({
            success:true,
            message:" Post fetched successfully",
            posts:posts

         })
            
        } catch (error) {
            next(error);
        }
    }

async createNewPost(req,res,next){
       try {
        
        const {content} =req.body;
   if(!content && !req.file){
    throw new CustomErrorHandler("Post must be contain content and media",400);
     }

     const post = await Post.create({
        content,
        media:req.file?req.file.filename:null, 
        userId:req.user.userID
     })
    //  console.log(req.file);
        // const post = {content:content,
        //               media:req.file.media,
        //               userId:req.user.userId
        // }
        // const addedPost = PostModule.addPosts(post);
        return res.status(201).json({
            success:true,
            message:"Post created successfully",
            post:post
        })
        
       } catch (error) {
         next(error);
       }
    }

   async getSpecificPost(req,res,next){
        try {
        const {id} = req.params;
        // const post = PostModule.getPosById(id);
        const post = await Post.findById(id);
        if(!post){
            throw new CustomErrorHandler("Post not found",401);
        }
        return res.status(200).json({
            success:true,
            message:`fetched ${id} this post successfully`,
            post:post
            
        })
            
        } catch (error) {
            next(error)
        }

    }

    //liked unliked post controller
    async likeToggel(req,res,next){
        try {
              const postId = req.params.id;
              const userId = req.user.userID;
            //   console.log('this is user id',req.user.userID);
            //   const likepost = PostModule.toggleLikes(postId,userId);
            const post = await Post.findById(postId);
            if(!post){
                throw new CustomErrorHandler("Post not fount!",401);
            }

            const isLikes = post.likes.includes(userId);
            let updatePost;
            if(isLikes){
             updatePost = await Post.findByIdAndUpdate(postId,
                {$pull:{likes:userId}},
                {new:true}
            )}
            else{
                updatePost =await Post.findByIdAndUpdate(postId,
                   {$addToSet:{likes:userId}},
                   {new:true}
                )
            }

              return res.status(200).json({
                success:true,
                message: isLikes?"Post unlike":"Post like",
                totleLike:updatePost.likes.length,
                post:updatePost,
              })
        } catch (error) {
            next(error);
        }
      

    }

    //get all likes
   async allLikes(req,res,next){
        try {
            // const post = PostModule.getAllLikes(req.params.id);
            const post = await Post.findById(req.params.id);
            return res.status(200).json({
                success:true,
                totalLikes:post.likes.length,
                message:post.likes,
                
            })
        } catch (error) {
            next(error);
        }
    }

}