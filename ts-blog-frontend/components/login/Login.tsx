import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import cookie from 'react-cookies';

import { toastError, toastSuccess } from '../toasts/toasts';
import {loginUser} from "../../api/requests";

//Importing interfaces
import {Ilogin} from "../../interfaces/user.interfaces";
import {ILoginResponse} from "../../interfaces/response.interfaces";

import styles from './styles.module.css';

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password should min 8 characters')
		.required('Password is required'),
});

const Login: React.FC<{}> = () => {
	const initialValues: Ilogin = { email: '', password: '' };
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values: Ilogin) => {
			loginUser(values.email, values.password)
			.then((res: ILoginResponse) => {
				console.log(res);
				// toastSuccess("User created.");
				cookie.save('token', res.data.token, { path: '/' })
			})
			.catch(e => {
				console.log(e);
				toastError("Something went wrong. Please try again.")
			})
		},
	  });
	return (
		<div>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<TextField
					id="email"
					name="email"
					variant="outlined"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					/><br />
				<TextField
					id="password"
					name="password"
					variant="outlined"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					/><br />
				<button type="submit" className={styles.submit}>
					Log in
				</button>
			</form>
		</div>
	);
};

export default Login;