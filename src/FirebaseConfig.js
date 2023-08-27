import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,setPersistence,browserLocalPersistence} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBJ2-i43KSmPtBCTjFIa9625Rn4pa-1rf4",
  authDomain: "busybuy-63af3.firebaseapp.com",
  projectId: "busybuy-63af3",
  storageBucket: "busybuy-63af3.appspot.com",
  messagingSenderId: "437139218887",
  appId: "1:437139218887:web:25d9cb00019aa506f0b9e2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
export { db };
