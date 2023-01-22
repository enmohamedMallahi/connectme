import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../libs/firebase';
import Loading from '../components/Loading';

export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
			setIsLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const signinWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then(async (result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const userData = result.user;
				console.log(userData);
				// check if user doc exists
				const userDocRef = doc(db, 'users', userData.uid);
				const docSnap = await getDoc(userDocRef);
				if (docSnap.exists()) {
					console.log('Document data:', docSnap.data());
				} else {
					setDoc(userDocRef, {
						followers: [],
						followings: [],
						posts: [],
					});
				}
				router.push('/');
			})
			.catch((err) => console.log(err.message));
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<AuthContext.Provider value={{ user, signinWithGoogle }}>
			{children}
		</AuthContext.Provider>
	);
};
