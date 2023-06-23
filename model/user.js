const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  userName:{
    type:String,
    required:true,
    unique: true,
    match: [/^\S*$/, "username cannot contain spaces"],
    validate: {
      validator: async function (value) {
        const user = await this.constructor.findOne({ userName: value });
        return !user;
      },
      message: "username is already taken",
    },
  },
  password:{
    type:String,
    required:true,
    minlength: [8, "Password must be at least 8 characters long"]
  },
  email:{
    type:String,
    required:true,
    unique: true,
    match: [/^\S+@\S+\.(com)$/,"Please provide a valid email address"],
    validate: {
      validator: async function (value) {
        const user = await this.constructor.findOne({ email: value });
        return !user;
      },
      message: "Email address is already taken",
    },
  },
  smoking:{
    type:Boolean,
    required:true,
  },
  dateOfBirth:{
    type:Date,
    required:true,
  },
  gender: {
    type: String,
    enum: ["female", "male"],
    required: true,
  },
  location:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:false,
  },
});
module.exports = mongoose.model("user", dataSchema);
