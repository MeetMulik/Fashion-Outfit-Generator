import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZfW_bEVapkHOa9LUWeopVug-HEGwxMkI",
  authDomain: "project-new-9cac1.firebaseapp.com",
  projectId: "project-new-9cac1",
  storageBucket: "project-new-9cac1.appspot.com",
  messagingSenderId: "786518028989",
  appId: "1:786518028989:web:40adf2f09f3e5f7b9b7dd4",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
