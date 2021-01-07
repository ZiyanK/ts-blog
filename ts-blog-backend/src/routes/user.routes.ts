import * as express from "express";
import userCreateMiddleware from "../middlewares/user.create.middlware";
import userControllers from "../controllers/user.controller";

const router = express.Router();

router.post("/create", userCreateMiddleware, userControllers.createUser);

router.post("/login", userControllers.loginUser);

export default router;