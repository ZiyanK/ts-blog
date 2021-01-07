import mongoose from "mongoose";
import validator from "validator";

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
		lowercase: true,
		validate(value: string) {
			if(!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	articles: {
		type: [String]
	}
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;