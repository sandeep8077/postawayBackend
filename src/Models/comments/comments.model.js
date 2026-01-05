import CustomErrorHandler from "../../../ErrorHandlers/CustomError.handler.js";

export default class CommentModel{


  
    constructor(id,text,userId,postId){
        this.id=id;
        this.text=text;
        this.userId=userId;
        this.postId = postId
        this.createdAt = Date.now();

    }

    // add comments
   static addComment(text,userId,postId){  
     if(!text){
        throw new CustomErrorHandler("Text must be required",400);
     }
    

     const comment = new CommentModel(
      Date.now(),
      text,
      userId,
      postId

     )
     
     comments.push(comment);
     return comment;
    
         

    }
 
    // get all comments 
   static getComment(){
    return comments;

  }

  // get comments by id
  static getCommentById(id){
      const comment = comments.find((c)=>c.id == id);
      if(!comment){
        throw new CustomErrorHandler("Comment not found",400);
      }
      return comment;
  }


  // update comments
   static updateComment(text,userId,commentId){
       console.log("this is comment id ",commentId);
      
        const comment = comments.find((c)=>c.id == commentId)
        if(!comment){
          throw new CustomErrorHandler("Comment not found",404);
        }

        if(comment.userId !== userId)
        {
          throw new CustomErrorHandler("not allowed",403)
        }
        comment.text = text;
        return comment;

  }

   static deleteComment(userId,commentId){
    const index = comments.findIndex((c)=>c.id == commentId);
     if(index == -1){
      throw new CustomErrorHandler("commment not find",404)
     }

     if(comments[index].userId !== userId){
       throw new CustomErrorHandler("User not found",403);
     }

     comments.splice(index,1);
     return true;
                 

  }
}

const comments = []