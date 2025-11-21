import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-native-food-delive-9ab20.firebaseapp.com",
  databaseURL:
    "https://react-native-food-delive-9ab20-default-rtdb.firebaseio.com",
  projectId: "react-native-food-delive-9ab20",
  storageBucket: "react-native-food-delive-9ab20.firebasestorage.app",
  messagingSenderId: "1018329846894",
  appId: "1:1018329846894:web:ca035cfa419cedb658027f",
  measurementId: "G-FRB4M3DX3E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Store user data in Realtime Database under "users" collection
  await set(ref(database, `users/${user.uid}`), {
    email: user.email,
    createdAt: new Date().toISOString(),
    uid: user.uid,
  });

  return userCredential;
};

export const getUserData = async (uid: string) => {
  const snapshot = await get(ref(database, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
};

export const signOut = () => firebaseSignOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
