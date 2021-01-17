import '../styles/globals.css'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>
			<ToastContainer position="bottom-right" autoClose={3000} />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
