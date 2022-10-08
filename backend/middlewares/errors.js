// 404 not Found handler.
// const notFoundPage = (req, res, next)=> {
//   next(res.status(500).json("Page not Found!"))
// }

const ErrorHandler = require('../utils/errorHandler');


// Default | Server | Programmer Common error handling.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // err.message = err.message || "Internal Server Error";
  
  // headers sent with response.
  if (res.headersSent) {
    return next(err)
  }

  if(process.env.NODE_ENV === "development"){
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }
  
  if(process.env.NODE_ENV === "production"){
    let error = {...err};
    error.message = err.message;

   res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    });
  }

  if(err.name === 'TokenExpiredError'){
    const message = "Web Token is Expired. Login agian"
    error = new ErrorHandler(message, 400)
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Internal server error!'
  })
  
};


