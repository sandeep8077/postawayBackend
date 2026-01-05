import UsersModule from "../Models/users/users.module.js"
import jwt from 'jsonwebtoken';
export default class UserController{

    getAllUsers(req,res,next){
      try {
         const users= UsersModule.getUsers();
         return res.status(200).json({success:true,
         message:"fetched successfully all users",
         users,
         });
      } catch (error) {
        next(error);
      }
     
    }

    signup(req,res,next){
      try {
          const user = UsersModule.addUser(req.body)
          return res.status(200).send({success:true,user});
        
      } catch (error) {
        next(error);
        
      }
    }

     signIn(req,res,next){
      
        const user = UsersModule.login(req.body);
        if(user){
        try {
          const token=  jwt.sign({userID:user.id,email:user.email},"sandeepkumar",{expiresIn:'1h'})
          return res.status(200).send({message:"Login successfully",token:token});
        } catch (error) {
          next(error);
        }
      }
    }


}