import { db } from "./firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where, serverTimestamp } from "firebase/firestore"

// Add a new newsletter subscriber
export async function addSubscriber(subscriberData) {
  try {
    // Check if email already exists
    const emailExists = await checkEmailExists(subscriberData.email)
    if (emailExists) {
      return { success: false, error: "This email is already subscribed" }
    }

    // Add subscriber to Firestore
    const subscriberRef = await addDoc(collection(db, "newsletter_subscribers"), {
      ...subscriberData,
      subscribedAt: serverTimestamp(),
    })

    return { success: true, id: subscriberRef.id }
  } catch (error) {
    console.error("Error adding subscriber:", error)
    return { success: false, error: error.message }
  }
}

// Check if email already exists in subscribers collection
async function checkEmailExists(email) {
  try {
    const q = query(collection(db, "newsletter_subscribers"), where("email", "==", email))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error("Error checking email:", error)
    throw error
  }
}

// Get all newsletter subscribers
export async function getAllSubscribers() {
  try {
    const q = query(collection(db, "newsletter_subscribers"), orderBy("subscribedAt", "desc"))
    const querySnapshot = await getDocs(q)

    const subscribers = []
    querySnapshot.forEach((doc) => {
      subscribers.push({ id: doc.id, ...doc.data() })
    })

    return subscribers
  } catch (error) {
    console.error("Error getting subscribers:", error)
    return []
  }
}

// Delete a subscriber
export async function deleteSubscriber(id) {
  try {
    await deleteDoc(doc(db, "newsletter_subscribers", id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting subscriber:", error)
    return { success: false, error: error.message }
  }
}
