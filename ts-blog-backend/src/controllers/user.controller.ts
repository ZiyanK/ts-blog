import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const { jwtToken } = require("../utils/config");

import User from "../models/user";
import publicProfile from "../helper/publicProfile";
import { IUser, IUserPublic } from "../interfaces";

const createUser = async (req: express.Request, res: express.Response) => {
	req.body.password = await bcrypt.hash(req.body.password, 8);
	const user:IUser = new User(req.body);
	try {
		await user.save()
		let userPublic = publicProfile(user);
		res.status(201).send({'user':userPublic});
	} catch(e) {
		res.status(400).send(e);
	}
};

const loginUser = async (req: express.Request, res: express.Response) => {
	try {
		let email = req.body.email;
		let password = req.body.password;

		const user:IUser = await User.findOne({ email })
		console.log(user);
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

		let userPublic:IUserPublic = publicProfile(user);

		res.status(200).send({user: userPublic, token});
	} catch(e) {
		res.status(400).send();
	}
}

const logoutUser = async (req: express.Request, res: express.Response) => {
	try {
		let user = req.body.userObject;
		user.tokens = user.tokens.filter((token: { token: object; }) => {
			console.log(token);
			return token.token !== req.body.token
		})
		await user.save();

		res.send("Logged out");
	} catch(e) {
		console.log(e);
		res.status(500).send();
	}
}

const logoutUserAll = async (req: express.Request, res: express.Response) => {
	try {
		let user:IUser = req.body.userObject;
		user.tokens = [];
		await user.save();

		res.send("Logged out from all devices");
	} catch(e) {
		console.log(e);
		res.status(500).send();
	}
}

const getProfileData = async (req: express.Request, res: express.Response) => {
	try {
		res.status(200).send(req.body.userObject);
	} catch(e) {
		res.status(400).send();
	}
}

const _ = {
	createUser,
	loginUser,
	logoutUser,
	logoutUserAll,
	getProfileData
}

export default _;