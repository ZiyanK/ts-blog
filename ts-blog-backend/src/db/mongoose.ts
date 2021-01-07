import mongoose from "mongoose";
const { mongoUri } = require("../utils/config");

const MONGO_URI = mongoUri || "mongodb://127.0.0.1:27017/ts-blog";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

mongoose.connection.on("open", () => {
	console.info("Connected to Mongo");
});
mongoose.connection.on("error", (err: any) => {
	console.error(err);
});