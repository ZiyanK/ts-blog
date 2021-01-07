import * as dotenv from "dotenv";
dotenv.config();

module.exports = {
	port: process.env.PORT,
	mongoUri: process.env.MONGO_URI,
	jwtToken: process.env.JWT_TOKEN
}