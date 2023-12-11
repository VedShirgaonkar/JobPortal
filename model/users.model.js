import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcryptjs"
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

//middleware

userSchema.pre("save",async function(){
    const salt =  await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
})
export const User = mongoose.model('User',userSchema)
export  default User;