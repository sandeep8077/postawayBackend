import express from 'express';
import UserController from '../../Controllers/user.controller.js';
import authUser from '../../Middleware/auth.middleware.js';
const userController = new UserController();

const userRouter = express.Router();

userRouter.get('/',authUser,userController.getAllUsers);
userRouter.post('/signup',userController.signup);
userRouter.post('/signin',userController.signIn)

export default userRouter;