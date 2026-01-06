import UsersModule from "../Models/users/users.module.js"
import bcrypt from 'bcrypt';
import User from "../Models/users/user.schema.js";
import jwt from 'jsonwebtoken';
import CustomErrorHandler from "../../ErrorHandlers/CustomError.handler.js";
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

     async signup(req,res,next){
      try {
          // const user = UsersModule.addUser(req.body)
          const {name,email,password} = req.body;

          const isEmail = await User.findOne({email});

           if(isEmail){
            throw new CustomErrorHandler("User already exist",409);
           }
           
           const hasedPassword = await bcrypt.hash(password,10);
           const user =  await User.create({name,email,password:hasedPassword});

          
          return res.status(201).send({success:true,message:"User created!",user:{id:user.id,name:user.name,email:user.email}});
        
      } catch (error) {
        next(error);
        
      }
    }

     async signIn(req,res,next){
      
       try { // const user = UsersModule.login(req.body);
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
          throw new CustomErrorHandler("Invalid User",401);
        }

          const isMatch = await bcrypt.compare(password,user.password);

          if(!isMatch){
            throw new CustomErrorHandler("Invalid User",401);
          }
        
          const token=  jwt.sign({userID:user.id,email:user.email},process.env.ENCODE_KEY,{expiresIn:'1h'})
          return res.status(200).send({message:"Login successfully",token:token});
      
      }
         catch (error) {
          next(error);
        }
    }


}