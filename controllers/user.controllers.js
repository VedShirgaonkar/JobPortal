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
    await User.create({
        name,
        lastName,
        email,
        password
    })
    res.status(200).send({
        success:true,
        message:"User Registered SuccessFully"
    })
    
}
export { userRegisterController,
};