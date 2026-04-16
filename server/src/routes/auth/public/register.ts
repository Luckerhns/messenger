import express from "express";
import UserController from "../../../controllers/user.controller";

const app = express.Router();

app.post("/", UserController.register);

export default app;
