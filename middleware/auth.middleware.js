import jwt  from "jsonwebtoken";
const userAuth=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer')){
        next('Auth Failed');
    }
    const token = authHeader.split(" ")[1];
    try{
        const payLoad = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user={userId:payLoad.userId}
        next();
       
    }catch(err){
        next('Auth Failed')
    }
}
export default userAuth;