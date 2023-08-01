import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shrutee:RXlQIt82gevjlgtd@school.o7ndiui.mongodb.net/jobFinder?retryWrites=true&w=majority"
    );
    console.log("DB connection: OK");
  } catch (error) {
    console.log("DB connection: Failed");
    console.log(error.message);
  }
};
