import  swaggerUi from "swagger-ui-express";
import swagerdoc from "swagger-jsdoc";
import  express  from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import "express-async-errors";
dotenv.config();

connectDB()
//swagger api config
const options = {
    definition:{
        openapi:"3.0.0",
    info:{
        title:'Job Portal Application',
        description:'Node Express js Job Portal Application'
    },
    servers:[{
        url:"https://jobportal-jcej.onrender.com"
    }]
    },
    apis: ["./routes/*.js"],
};
const spec = swagerdoc(options)
const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"))

//route import
import userRoute from "./routes/user.routes.js";
import  errMiddlewareHandler from "./middleware/err.middleware.js";
import updateUserRoute from "./routes/updateUser.routes.js"
import jobRoute from "./routes/jobs.route.js"
//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/update",updateUserRoute)
app.use("/api/v1/job",jobRoute)

//home route
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));

//error Middleware Handler
app.use(errMiddlewareHandler)
app.get('/',(req,res)=>{
    res.send(`<h1>Hii this is Job Portal Application`);
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening to ${port} in  ${process.env.DEV_MODE} mode`);
})
