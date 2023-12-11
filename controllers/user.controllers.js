import User from "../model/users.model.js";
const userRegisterController =async(req,res,next) =>{
   
        const {name,lastName,email,password} =req.body;
   
// if (!name) {
    //     next("Name is required");
    // }
    // if (!lastName) {
    //     next("lastname is required");
    // }
    // if (!email) {
    //     next("email is required");
    // }
    // if (!password) {
    //     next("password is required");
    // }
//    const existingUser =  await User.findOne({email})
//     if(existingUser){
//      return  res.status(500).send({
//         success:false,
//         message:"Email is already taken"
//       }    )
 //   }
   const user =  await User.create({
        name,
        lastName,
        email,
        password
    })
    const token = await user.generateAccessToken();
    res.status(200).send({
        success:true,
        message:"User Registered SuccessFully",
        user,
        token
    })
    
}
//Login Controller
const userLoginController =async(req,res)=>{
        const{email,password}=req.body;
        if(!email || !password){
            next('Please Provide All fields');
        }
        const user = await User.findOne({email});
        if(!user)
        {
            next('Invalid Credentials')
        }
        const isMatch =  user.comparePassword(password);
        if(!isMatch){
            next('Wrong Password');
        }
        user.password = undefined;
        const token =  await user.generateAccessToken();
        res.status(200).send({
            success:true,
            message:"LoggedIn SuccessFully",
            user,
            token
        })
}
export { userRegisterController,
userLoginController};

