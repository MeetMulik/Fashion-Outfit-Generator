import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "images", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getGeneratedImages = async () => {
  const imgs = await getDocs(query(collection(firestore, "images")));
  return imgs.docs.map((doc) => doc.data());
};
