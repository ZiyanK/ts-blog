import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const { jwtToken } = require("../utils/config");

import User from "../models/user";

const createUser = async (req: express.Request, res: express.Response) => {
	req.body.password = await bcrypt.hash(req.body.password, 8);
	const user = new User(req.body);
	try {
		await user.save()
		res.status(201).send(user);
	} catch(e) {
		res.status(400).send(e);
	}
};

const loginUser = async (req: express.Request, res: express.Response) => {
	try {
		let email = req.body.email;
		let password = req.body.password;

		const user = await User.findOne({ email })
		if(!user) {
			throw new Error("Unable to login");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch) {
			throw new Error("Unable to login");
		}

		const token = jwt.sign({ _id: user._id.toString() }, jwtToken);
		user.tokens = user.tokens.concat({ token });
		await user.save();
		
		res.status(200).send({user, token});
	} catch(e) {
		res.status(400).send();
	}
}

const _ = {
	createUser,
	loginUser
}

export default _;