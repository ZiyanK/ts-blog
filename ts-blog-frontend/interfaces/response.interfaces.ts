export interface ILoginResponse {
	data: {
		token: string;
		user: {
			email: string;
			name: string;
		}
	}
}