import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
        minlength:[6,"Password must be more than 5 characters"],
        select:true
    },
    location:{
        type:String,
        default:"India"
    }
},{timestamps:true});

//middleware bcrypt

userSchema.pre("save",async function(){
    if (!this.isModified) return;
    const salt =  await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
})
//comparePAssword
userSchema.methods.comparePassword =async function(userPassword){
    const isMatch =   await bycrypt.compare(userPassword,this.password) 
}
//Json WebToken
userSchema.methods.generateAccessToken = function(){
    return  jwt.sign(
        {userId:this._id,},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1d'}
    )
}       


export const User = mongoose.model('User',userSchema)
export  default User;