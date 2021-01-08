import * as express from "express";

//Import middlewares
import userCreateMiddleware from "../middlewares/create.user.middlware";
import userAuth from "../middlewares/auth.user.middleware";

//Import controller
import userControllers from "../controllers/user.controller";

const router = express.Router();

router.post("/create", userCreateMiddleware, userControllers.createUser);

router.post("/login", userControllers.loginUser);

router.post("/logout", userAuth, userControllers.logoutUser);

router.post("/logoutAll", userAuth, userControllers.logoutUserAll);

router.get("/me", userAuth, userControllers.getProfileData);

export default router;