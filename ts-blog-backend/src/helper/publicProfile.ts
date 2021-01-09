import { IUser, IUserPublic } from "../interfaces/user.interface";

const publicProfile = (user: IUser) => {
	let userObject:IUserPublic = {
		name: user.name,
		email: user.email
	}
	return userObject;
}

export default publicProfile;