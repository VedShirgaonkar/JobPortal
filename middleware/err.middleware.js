const errMiddlewareHandler =(err,req,res,next)=>{
    console.log(err);
    //creating a reusable object defaultErrors
    const defaultErrors = {
        statusCode:500,
        message:err,
    }
       
        //Missing Field Error
        if(err.name === 'ValidationError'){
            defaultErrors.statusCode=400,
            defaultErrors.message = Object.values(err.errors)
            .map((item)=>item.message).join(',');
        }
        //duplicate error
        if(err.code && err.code === 11000){
            defaultErrors.statusCode= defaultErrors.statusCode || 400
            defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique this is already registered you can login`;
           // console.log(defaultErrors.message);
        }
res.status(defaultErrors.statusCode=400).json({
    statusCode:defaultErrors.statusCode,
    message:defaultErrors.message})
}
export default errMiddlewareHandler;
