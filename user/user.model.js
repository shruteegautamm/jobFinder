import mongoose from "mongoose";

// set rule
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 155,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },

  userType: {
    type: String,
    enum: ["seeker", "provider"],
    required: true,
    trim: true,
  },

  personName: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 155,
    nullable: true,
  },
  organizationName: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 155,
    nullable: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// create table
export const User = mongoose.model("User", userSchema);
