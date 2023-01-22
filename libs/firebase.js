import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyBIQNRLhwg6Vr1a7OBm7mDalj7Gs_E4F-w',
	authDomain: 'connectme-c258b.firebaseapp.com',
	projectId: 'connectme-c258b',
	storageBucket: 'connectme-c258b.appspot.com',
	messagingSenderId: '606687735043',
	appId: '1:606687735043:web:1bbf8ac3db606c58110d36',
	measurementId: 'G-0V9L17Y415',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.languageCode = 'it';
