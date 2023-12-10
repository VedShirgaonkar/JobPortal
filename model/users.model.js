import mongoose from "mongoose";
import validator from "validator";
const userSchema  =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    lastName:{
        type:String
        
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate: validator.isEmail,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required "],
        minlength:[6,"Password must be more than 5 characters"]
    },
    location:{
        type:String,
        default:"India"
    }
},{timestamps:true});
export const User = mongoose.model('User',userSchema)
export  default User;