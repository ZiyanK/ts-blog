import React from 'react';
import { FormikValues, useFormik } from 'formik';
import Button from "@material-ui/core/Button";
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.css';

interface MyFormValues {
	name: string;
	email: string;
	password: string;
}

const validationSchema = yup.object({
	name: yup
		.string()
		.required('Name is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password should min 8 characters')
		.required('Password is required'),
});

const Signup: React.FC<{}> = () => {
	const initialValues: MyFormValues = { name: '', email: '', password: '' };
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values: FormikValues) => {
			await fetch('http://localhost:8080/user/create', {
				method: 'POST',
				body: JSON.stringify(values)
			})
			.then((res) => res.json())
			.then((res) => console.log(res));
		},
	  });
	return (
		<div>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<TextField 
					id="name"
					name="name"
					variant="outlined"
					label="Name"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/><br />
				<TextField
					id="email"
					name="email"
					variant="outlined"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					/><br />
				<TextField
					id="password"
					name="password"
					variant="outlined"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
					/><br />
				<button type="submit" className={styles.submit}>
					Sign up
				</button>
			</form>
		</div>
	);
};

export default Signup;