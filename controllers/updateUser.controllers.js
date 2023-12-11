import User from "../model/users.model.js"
const updateUserController=async(req,res)=>{
    const { name, email, lastName,  location} = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user =  await User.findById({_id:req.user.userId})
  {
    user.name = name,
    user.lastName=lastName,
    user.location=location,
    user.email=email
  }
  await user.save();
  const token = user.generateAccessToken();
  res.status(200).json({
    user,
    token,
  });
}
export {updateUserController}