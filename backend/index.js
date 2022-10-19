// external imports
const express =  require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const cors = require('cors');


// config calling.
const app = express();
app.use(cors());
app.use(cookieParser());
dotenv.config();
app.use(express.json());


// internal imports
const DataBaseConfiguration = require("./config/database");
const errorsMiddleware = require("./middlewares/errors");
const userRoute = require("./routes/userRoute");
const VendorRoute = require("./routes/VendorRoute");


// database Connection
DataBaseConfiguration();


// response parses 
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// listing home route.
app.get('/', (req, res) => {
    res.send("Welcome to the API");
})


// Routings
app.use('/', userRoute);
app.use('/', VendorRoute);



// 404 page error handling.
const notFoundPage =(req, res, next)=> {
    next(res.status(500).json("Page not Found!"))
}
app.use(notFoundPage);

// Default | Server | Programmer Common error handling....
app.use(errorsMiddleware);


// app listing
const server= app.listen(process.env.PORT || 8001, () => {
    console.log(`App listing on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})


// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })