import mongoose  from "mongoose";
const connectDb = async()=>{
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("database connected successfully");
} catch (error) {
    console.log("Faile to connect database" ,error.message);
}
}

export default connectDb;

