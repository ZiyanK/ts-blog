import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	name: string,
	email: string;
	password: string;
	tokens: Array<Object>;
	createdAt: Date;
	modifiedAt: Date;
}

export interface IUserPublic {
	name: string,
	email: string
}

export interface IJWTDecoded {
	_id: string,
	iat: BigInteger
}