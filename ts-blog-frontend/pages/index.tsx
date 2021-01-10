import { formatMs } from "@material-ui/core";
import { useState } from "react";
import Login from "../components/login/Login";
import Signup from '../components/signup/Signup'
import styles from '../styles/Home.module.css'

export default function Home() {
	const [isSignup, setIsSignup] = useState(true);

	return (
		<div className={styles.container}>
			<p className={styles.title}>Welcome to Ziyan's Blog website</p>
			<div className={styles.form_container}>
				<div className={styles.form_button_container}>
					<button onClick={() => setIsSignup(true)} className={styles.signup_login_button}>Sign up</button> 
					<button  onClick={() => setIsSignup(false)} className={styles.signup_login_button}>Log in</button>
				</div>
				<div className={styles.inner_form_container}>
					{
					isSignup
					? 
						<Signup />
					:
						<Login />
					}
				</div>
			</div>
		</div>
	)
}
