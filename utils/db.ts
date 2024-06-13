import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/config/firebase";

const firebaseDB = getFirestore(firebaseApp);
export default firebaseDB;
