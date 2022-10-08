const User = require('../models/UserSchema');
const ErrorHandler = require('../utils/errorHandler');
const { sendToken } = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');


// register a user
// exports.registerUser = async(req, res, next) => { 
//   try {
//     const {name, email, password, role} = req.body;

//     const Checkuser = await User.findOne({email});
//     if(Checkuser){
//       throw new ErrorHandler(`User already registered`, 400);
//     }

//     const user = await User.create({ 
//        name, email, password, role
//     })
    
//     // data storeing in Students & Teacher collections with Schema validation.
//     const staff_info = user.id;
//     const admin_info = user.id;

//     if(role === 'staff'){ await Student.create({ student_info}) }
//     else if(role === 'admin'){ await Admin.create({ admin_info }) }
    

//     // generate and sending token for user.
//     const token = await user.getJwtToken();
//     // sendToken(user, res, 200);
    
//     res.status(200).json({
//       success: true,
//       message: "User Registered in successfully",
//       token,
//     })

      
//   } catch (error) {
//     res.status(500).json({success: false, error: error.message})
//   }
// }
   

// User Login 
exports.LoginUser = async(req, res, next) => { 
  try {
    const {email, password} = req.body;

    // Checking if user has given password & email both.
    if(!email || !password) {
      throw new ErrorHandler(`Please provide email and password`, 400);
    }

    // Checking if user is registered or not.
    const CheckUser = await User.findOne({email});
    if(!CheckUser){
      throw new ErrorHandler(`User not registered`, 400);
    }
    
    // Checking if user is registered or not. 
    const auth = await User.findOne({email}).select('+password');
     if(!auth){
       throw new ErrorHandler(`invailed email and password`, 400);
     }

     // compare password.
     const isPassMatched = await auth.comparePassword(password); 
     if(!isPassMatched){
       throw new ErrorHandler(`invailed email and password`, 400);
      }
    
    // generate and sending token for user.
    sendToken(auth, res, 200);
    // const token = await user.getJwtToken(); 
    // console.log(token);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Logout user
// exports.logoutUser = async(req, res, next) => {
//   try {
//     // res.cookie('token', null, {
//     //   expires: new Date(Date.now()),
//     //   httpOnly: true
//     // })
//     res.clearCookie('token');
//     res.status(200).json({
//       message: "Logout Successfull."
//     })
//   } catch (error) {
//     res.status(500).json({success: false, error: error.message})
//   }
// }


// geting Users 
// exports.getUsers = async(req, res, next) => {
//     try {
//         const users = await User.find();
//         res.status(201).json({
//             success: true,
//             users
//         })
//     } catch (error) {
//         res.status(404).json({success: false, error: error.message})   
//     }
// }


//change or update passsword 
// exports.Updatepassword = async(req, res, next) => {
//   const user = await User.findById(req.user.id).select('+password');

//   // check previous user password
//   const isMatch = await user.conparePassword(req.body.oldPassword);
//   if(!isMatch){
//     throw new ErrorHandler(`Please login first`, 400)
//   }
//   user.password = req.body.password;
//   await user.save();


//   sendToken(user, res, 200);
// }




// Forgot Password......
// exports.ForgotPassword = async(req, res, next) => {
//   try {
//     const user = await User.findOne({email: req.body.email});
//     if(!user){
//         return next("User not found!")
//     }else{
//       // Geting reset password token.
//       const resetToken = user.getResetPasswordToken();
//       await user.save({validateBeforeSave: false});

//       // insted of this  -- http://localhost:5000/api/user/restPassword
//       const resetPassUrl = `${req.protocol}://${req.get("host")}/api/user/password/reset/${resetToken}`;
      
//       const message = `your password reset token is :- \n \n ${resetPassUrl} \n \n if you have not resqusted this email then please ignore it.`

//       try {
//         await SendEmail({
//           email : user.email,
//           subject :  `Classroom Password Recovery`,
//           message,
//         });
//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email} successfully`
//         })
//       } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({validateBeforeSave: false});
//         return next(error.message);
//       }
//     }

//   } catch (error) {
//     res.status(404).json({
//       error: error.message,
//       stack: error.stack
//     })
//   }
// }


// get single user
// exports.getSingleUser = async(req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if(!user){
//       return next("User not found!")
//     }
//     res.status(200).json({
//       success: true,
//       user: user
//     })
//   } catch (error) {
//     res.status(404).json({
//       error: error.message,
//       stack: error.stack
//     })
//   }
// }


// geting currently login user deatails => 
// exports.currentLoginUserProfile = async(req, res, next) => {
//   try {
//    const user = await User.findOne({ _id: req.user.id}).select('-password').exec();
//   //  console.log("Current user from backend: ", user);

//    if(!user){  
//      throw new ErrorHandler(`User doesn't exist`)
//    }
//    res.status(200).json({
//       success: true,
//       user
//    })
//   } catch (error) {
//     res.status(404).json({
//       error: error.message,
//       // stack: error.stack,
//     })
//   }
// }
