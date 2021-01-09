import * as mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>('user', UserSchema);

export default User;