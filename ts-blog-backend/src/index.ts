import app from "./app";
import http from "http";
require("./db/mongoose");
const { port } = require("./utils/config");

const PORT = port;
const server = http.createServer(app);

server.listen(PORT);
server.on("listening", async () => {
	console.info(`Listening on port ${PORT}`);
});