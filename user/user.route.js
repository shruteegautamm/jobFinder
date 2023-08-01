import express from "express";
import {
  addUser,
  authorizeUser,
  deleteAccount,
  getAllUsers,
  loginUser,
  validateUser,
} from "./user.service.js";

const router = express.Router();

// register user

router.post("/user/register", validateUser, addUser);

// login user
router.get("/user/login", loginUser);

// get all user
// secure route
router.get("/users", authorizeUser, getAllUsers);

// delete account
router.delete("/user/delete", authorizeUser, deleteAccount);

export default router;
