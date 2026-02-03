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

// 🔹 Generate random campaignId
const generateCampaignId = () => {
  return Math.random().toString(36).substring(2, 10); // e.g. "a9x7k2p3"
};

// 🔹 Add to waitlist (with campaign tracking)
export const addToWaitlist = async (email, pathname = "/personal") => {
  try {
    // ✅ Choose collection based on pathname
    let collectionName = "waitlistPersonal"; // Default collection
    let source = "personal"; // Default source

    if (pathname.includes("business")) {
      collectionName = "waitlistBusiness";
      source = "business";
    } else if (pathname.includes("upi")) {
      collectionName = "waitlistUpi";
      source = "upi";
    }

    // Check if email already exists in that collection
    const q = query(collection(db, collectionName), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Email already exists in this waitlist");
    }

    const newCampaignId = localStorage.getItem("campaignId");

    const docRef = await addDoc(collection(db, collectionName), {
      email,
      campaignId: newCampaignId,
      timestamp: new Date(),
      source, // Use the dynamic source variable
    });

    return { id: docRef.id, campaignId: newCampaignId };
  } catch (error) {
    throw error;
  }
};