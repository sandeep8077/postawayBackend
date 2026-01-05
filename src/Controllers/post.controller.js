import PostModule from "../Models/posts/post.module.js";

export default class PostController{


    getAllPost(req,res,next){
        try {
         const posts = PostModule.getAll();
         return res.status(201).json({
            success:true,
            message:" Post fetched successfully",
            posts:posts

         })
            
        } catch (error) {
            next(error);
        }
    }

    createNewPost(req,res,next){
       try {
        const {content} =req.body;
        const post = {content:content,
                      media:req.file.media,
                      userId:req.user.userId
        }
        const addedPost = PostModule.addPosts(post);
        return res.status(201).json({
            success:true,
            message:"Post created successfully",
            post:addedPost
        })
        
       } catch (error) {
         next(error);
       }
    }

    getSpecificPost(req,res,next){
        try {
        const {id} = req.params;
        const post = PostModule.getPosById(id);
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
    likeToggel(req,res,next){
        try {
              const postId = req.params.id;
              const userId = req.user.userID;
            //   console.log('this is user id',req.user.userID);
              const likepost = PostModule.toggleLikes(postId,userId);
              return res.status(200).json({
                success:true,
                message: likepost.action,
                post:likepost.post
              })
        } catch (error) {
            next(error);
        }
      

    }

    //get all likes
    allLikes(req,res,next){
        try {
            const post = PostModule.getAllLikes(req.params.id);
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