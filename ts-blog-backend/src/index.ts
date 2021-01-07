import app from "./app";
import http from "http";
require("./db/mongoose");

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT);
server.on("listening", async () => {
	console.info(`Listening on port ${PORT}`);
});