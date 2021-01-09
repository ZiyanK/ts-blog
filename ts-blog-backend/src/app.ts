import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes";
import articleRoutes from "./routes/article.routes";

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(helmet());

app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).send("Backend up and running");
})

app.use("/user", userRoutes);
app.use("/articles", articleRoutes);

export default app;