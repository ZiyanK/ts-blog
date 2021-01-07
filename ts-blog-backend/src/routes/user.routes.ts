import * as express from "express";
import userControllers from "../controllers/user.controller";

const router = express.Router();

router.post("/create", userControllers.createUser);

export default router;