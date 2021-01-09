import * as express from "express";

//Import middlewares
import userAuth from "../middlewares/auth.user.middleware";

//Import controller
import articleControllers from "../controllers/article.controller";

const router = express.Router();

router.post("/article", userAuth, articleControllers.createArticle);

router.get("/article", userAuth, articleControllers.getMyArticles);

router.get("/article/:id", userAuth, articleControllers.getArticle);

router.put("/article/:id", userAuth, articleControllers.updateArticle);

router.delete("/article/:id", userAuth, articleControllers.deleteArticle);

router.get("/all", userAuth, articleControllers.getAllArticles);

export default router;