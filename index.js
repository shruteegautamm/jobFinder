import express from "express";
import { db_connect } from "./db_connect.js";
import userRoutes from "./user/user.route.js";

const app = express();
app.use(express.json());

//db connection
db_connect();

//register routes
app.use(userRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port`, port);
});
