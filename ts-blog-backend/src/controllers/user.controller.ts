import * as express from "express";
import UserModel from "../models/user";

const createUser = (req: express.Request, res: express.Response) => {
	try {
		console.log(req.body);
		res.status(201).send("User created successfully");
	} catch(e) {

	}
}

const _ = {
	createUser
}

export default _;