import * as express from "express";
import * as jwt from "jsonwebtoken";
const { jwtToken } = require("../utils/config");
import User from "../models/user";

import { IJWTDecoded } from "../interfaces";

const userAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const token = req.headers.authorization!.replace('Bearer ', '');
		let decoded = jwt.verify(token, jwtToken) as IJWTDecoded;
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

		if(!user) {
			throw new Error();
		}
		
		req.body.token = token;
		req.body.userObject = user;
		next();
	} catch(e) {
		res.status(401).send({error: "Unauthorized"})
	}
	
	// next();
}

export default userAuth;