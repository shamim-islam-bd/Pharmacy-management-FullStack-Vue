const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  email: {
   type: String,
   required: [true, "Please enter your email!"],
   unique: true,
   validate: [
      validator.isEmail, "Please enter your valied email"
   ]
  },
  password: {
   type: String,
   required: [true, "Please enter your password!"],
   minlength: [6, "password should be atleast 6 char"],
   select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// password bcrption here...
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})


// Makeing passwordToken & Return JWT token where user signup...
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME
  })
}

// compare password with bcryptjs
userSchema.methods.comparePassword = async function(enteredPassword){
  const isMatch = await bcrypt.compare(enteredPassword, this.password)
  return isMatch;
}


// Generating password Reset token....
userSchema.methods.getResetPasswordToken = function() {
  const resetToken =  crypto.randomBytes(20).toString("hex");
  //Hasing & adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");

   this.resetPasswordExpire = Date.now() + 15*60*1000;
   return resetToken;
};



const User = mongoose.model("User", userSchema);
module.exports =  User;