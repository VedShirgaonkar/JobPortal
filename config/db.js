import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`connected to Mongodb ${connectionInstance.connection.host}`);
    }catch(err){
        console.log(err);
        console.log(`Something went wrong while connnecting to DB`)
        process.exit(1);
    }
}
export default connectDB;