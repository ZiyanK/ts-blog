import * as express from "express";
import validator from "validator";

const userCreateMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	let email:string = req.body.email;
	let password:string = req.body.password;
	
	if(!validator.isEmail(email)) {
		res.status(400).send("Not a valid email");
		return;
	}

	if(password.length < 6) {
		res.status(400).send("Password is too short");
		return;
	} else if(password.length > 13) {
		res.status(400).send("Password is too long");
		return;
	}
	next();
}

export default userCreateMiddleware;