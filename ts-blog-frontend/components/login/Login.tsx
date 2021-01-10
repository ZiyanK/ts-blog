import React from 'react';
import { useFormik } from 'formik';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.css';

interface MyFormValues {
	name: string;
	email: string;
	password: string;
}

const Login: React.FC<{}> = () => {
	const initialValues: MyFormValues = { name: '', email: '', password: '' };
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
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