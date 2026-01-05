import dotnet from 'dotenv';
import  express from 'express';
import userRouter from './src/Routes/userRoutes/user.route.js';
import loggerMiddleware from './src/Middleware/logger.middleware.js';
import errorHandlerMiddleware from './src/Middleware/errroHandlers.middleware.js';
import postRouter from './src/Routes/postRoutes/post.routes.js';
import commentRouter from './src/Routes/comments/comments.routes.js';
import connectDb from './src/config/db.js';
dotnet.config();


const app = express();


app.use(express.json());
app.use(loggerMiddleware);

//handle user routes
app.use('/api/users',userRouter);

//handle post routes
app.use('/api/posts',postRouter);

//handle comment routes
app.use('/api/comments',commentRouter);

// default router
app.get('/',(req,res)=>{
    res.send("Hello World");
})



app.use(errorHandlerMiddleware);

app.listen(3800,async()=>{
    console.log("Error in starting server");
    console.log("Server is running on http://localhost:3800");
    connectDb();
})