import { AuthProvider } from '../context/AuthContext';
import { PinsProvider } from '../context/PinsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<PinsProvider>
				<Component {...pageProps} />
			</PinsProvider>
		</AuthProvider>
	);
}

export default MyApp;
