import CustomErrorHandler from "../../../ErrorHandlers/CustomError.handler.js";

export default class PostModule{
    constructor(id,content,media,userId){
    this.id = id;
    this.content = content;
    this.media = media;
    this.userId = userId;
    this.likes = []
    this.createdAt= Date.now();
    
    }

    //get all posts
    static getAll(){
         return posts; 
    }

    // add post 
    static addPosts({content,media,userId}){
         if(!content && !media){
            throw new CustomErrorHandler("Post must contain content , media",400)
         }
         const post = new PostModule(
            Date.now(),
            content,
            media,
            userId,
            
         );

         posts.push(post);
         return post
    }

    //get post by id
    static getPosById(id){
        const post = posts.find((p)=>p.id == id)
        if(!post){
            throw new CustomErrorHandler("Post not fount",401);
        }
        return post;
    }


    //likes and unlike posts
    static toggleLikes(postId,userId){
        const post = posts.find((p)=>p.id == postId);
        if(!post){
            throw new CustomErrorHandler("Post not found!", 401);
        }

      const index = post.likes.indexOf(userId);

      if(index===-1){
        post.likes.push(userId)
        return {action:"liked",post}
      }
      else{
        post.likes.splice(index,1)
        return {action:"unliked",post}
      }

    }

    // get all likes 
   static getAllLikes(postId){
        const post = posts.find((p)=>p.id == postId)
        if(!post){
            throw new CustomErrorHandler("Product not found",401);
        }
        return post;
    }

}

const posts = []