import * as express from "express";

//Import middlewares
import userCreateMiddleware from "../middlewares/create.user.middlware";
import userAuth from "../middlewares/auth.user.middleware";

//Import controller
import userControllers from "../controllers/user.controller";

const router = express.Router();

router.post("/create", userCreateMiddleware, userControllers.createUser);

router.post("/login", userControllers.loginUser);

router.get("/me", userAuth, userControllers.getUsers);

export default router;