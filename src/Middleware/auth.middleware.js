import jwt from 'jsonwebtoken';
const authUser = (req,res,next)=>{
    const headers = req.headers.authorization;

    if(!headers){
        return res.status(401).json({
            message:"Token missing"
        })
    }

    const token  = headers.split(" ")[1];
    try {
        const decode = jwt.verify(token,process.env.ENCODE_KEY);
        // console.log('this is decode',decode);
        req.user = decode;
        // console.log('this is req.user',req.user);
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid Token"})
    }
}

export default authUser;