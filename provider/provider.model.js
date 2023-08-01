import mongoose from "mongoose";
import { locationSchema } from "./location.model.js";

const jobProviderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 85,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    trim: true,
    enum: ["entry", "junior", "mid", "senior", "none"],
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
    enum: ["none", "school", "bachelors", "masters", "phD"],
  },
  industryType: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
    minLength: 200,
    maxLength: 700,
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  responsibility: {
    type: [String],
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  offeredSalary: {
    minSalary: {
      type: Number,
      required: true,
      min: 500,
    },
    maxSalary: {
      type: Number,
      required: true,
      min: 10000,
    },
  },
  jobTime: {
    type: String,
    required: true,
    trim: true,
    enum: ["part", "full"],
  },
});
