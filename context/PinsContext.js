import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	getDocs,
	onSnapshot,
	collection,
	getDoc,
	doc,
	addDoc,
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { db } from '../libs/firebase';
import Loading from '../components/Loading';

export const PinsContext = createContext();

export const usePins = () => {
	return useContext(PinsContext);
};

export const PinsProvider = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();
	const [pins, setPins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const pinsRef = collection(db, 'pins');
		const unsubscribe = onSnapshot(pinsRef, (querySnapshot) => {
			let data = [];
			querySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setPins(data);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const createNewPin = async (pin) => {
		await addDoc(collection(db, 'pins'), {
			...pin,
			user: {
				uid: user.uid,
				displayName: user.displayName,
				photoUrl: user.photoURL,
			},
			likes: [],
		});
	};

	const getPinById = async (pinId) => {
		const docSnap = await getDoc(doc(db, 'pins', pinId));
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return new Error('There is no pin with this id');
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<PinsContext.Provider value={{ pins, createNewPin, getPinById }}>
			{children}
		</PinsContext.Provider>
	);
};
