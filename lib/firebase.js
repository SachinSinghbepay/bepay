import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Firebase config from .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// 🔹 Generate random referralId
const generateReferralId = () => {
  return Math.random().toString(36).substring(2, 10); // e.g. "a9x7k2p3"
};

// 🔹 Add to waitlist (with referral tracking)
export const addToWaitlist = async (email, referredBy = null) => {
  try {
    // Check if email already exists
    const q = query(collection(db, "waitlist"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Email already exists in waitlist");
    }

    // Generate unique referralId for this new user
    const referralId = generateReferralId();

    // Add new entry
    const docRef = await addDoc(collection(db, "waitlist"), {
      email,
      referralId,       // ✅ unique referral link for this user
      referredBy: referredBy || null, // ✅ track if someone referred them
      timestamp: new Date(),
      source: "popup",
    });

    return { id: docRef.id, referralId };
  } catch (error) {
    throw error;
  }
};
