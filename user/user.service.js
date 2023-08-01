import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import { userSchema } from "./user.validation.js";
import jwt from "jsonwebtoken";

// validate user
export const validateUser = async (req, res, next) => {
  const newUser = req.body;

  try {
    await userSchema.validateAsync(newUser);
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// add user
export const addUser = async (req, res) => {
  let newUser = req.body;

  //   check if email is already used
  const user = await User.findOne({ email: newUser.email });

  if (user) {
    return res.status(409).send({
      message: "User with this email already exists in our system.",
    });
  }

  newUser.password = await bcrypt.hash(newUser.password, 8);
  //console.log(req.body.password, hashedPassword);
  //pathako pw:shrutee@123, hashedpassword:$2b$08$Ek.X6vHzz632e1FWEYnLKuaZaDOltIA/7swePZBKLo1z4XJz37vTe

  await User.create(newUser);

  return res.status(201).send({ message: "User is registered successfully." });
};

export const loginUser = async (req, res) => {
  const loginCredentials = req.body;
  //   check if user exists using email
  const user = await User.findOne({ email: loginCredentials.email });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  //   remove password from response
  user.password = undefined;

  //   generate access token
  //   encrypt=> jwt.sign
  const accesstoken = jwt.sign({ _id: user._id }, "djakfadfakv1234dfjkad", {
    expiresIn: "1d", //1 din pachi tyo token bhaye nai pani access paidaina
  });

  return res.status(200).send({ user, accesstoken });
};

// authorize user
export const authorizeUser = async (req, res, next) => {
  // validate token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Something went wrong." });
  }

  const tokenData = authHeader.split(" ");
  const token = tokenData[1];

  try {
    // decrypt
    const payload = jwt.verify(token, "djakfadfakv1234dfjkad");

    const user = await User.findOne({ _id: payload._id });

    if (!user) {
      return res
        .status(401)
        .send({ message: "You are not entitled to use this service." });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "You are not entitled to use this service." });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();

  return res.status(200).send({ message: users });
};

export const deleteAccount = async (req, res) => {
  await User.deleteOne({ _id: req.user._id });

  return res
    .status(200)
    .send({ message: "Your account is deleted successfully." });
};
