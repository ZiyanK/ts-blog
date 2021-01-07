import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	tokens: Array<Object>;
}

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

UserSchema.statics.findByCredentials = async (email: string, password: string)=> {
	const user = await User.findOne({ email })

	if(!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if(!isMatch) {
		throw new Error("Unable to login");
	}

	return user;
}

const User: mongoose.Model<IUser> = mongoose.model<IUser>('user', UserSchema);

export default User;