import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 55,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 35,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 55,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 6,
  },
});
