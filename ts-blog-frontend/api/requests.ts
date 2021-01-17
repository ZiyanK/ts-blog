import activityLayerApi from "./activityLayerApi";

export const signupUser = (name: string, email: string, password: string) => {
	return new Promise((resolve, reject) => {
		activityLayerApi.post("/user/create", {
			name,
			email,
			password
		})
		.then((res) => {
			console.log(res);
			resolve(res);
		})
		.catch(e => {
			console.log(e);
			reject(e);
		})
	})
}

export const loginUser = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		activityLayerApi.post("/user/login", {
			email,
			password
		})
		.then((res) => {
			console.log(res);
			resolve(res);
		})
		.catch(e => {
			console.log(e);
			reject(e);
		})
	})
}