
const jwt =require('jsonwebtoken');
const User = require('../models/UserSchema');
const ErrorHandler = require('../utils/errorHandler');

// cheack user is authenticated or not.
exports.isAuthenticated = async(req, res, next) => {
    try {
        // bearer token split from localstorage token.
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new ErrorHandler(`you are not authenticated!`, 400)
        }else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            // check user is exist or not on database.
            if(!user){
                throw new ErrorHandler(`you are not authenticated!`, 400)
            }
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(500).json({
         success: false,
         error: error.message,
        //  error: error.stack,
        })
    }
 }


 // authorize Multiple Role 
    exports.authorizeRoles = (...roles) => { 
        const rolesArray = [...roles];
        try {
            return (req, res, next) => { 
                const userRole = req.user.role;
                const result = rolesArray.map(role => userRole.includes(role)).find(item => item === true);

                if(!result) return res.status(401).json({
                    message: `${req.user.role} cann't authorized to access this route.`
                })
                next();
            }
            
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    }
