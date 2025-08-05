import { db } from "./firebase"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"

// Check if email already exists in contact submissions
async function checkEmailExists(email) {
  try {
    const q = query(collection(db, "contact-submissions"), where("email", "==", email))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error("Error checking email:", error)
    throw error
  }
}

// Add a new contact form submission
export async function addContactSubmission(formData) {
  try {
    // Check if email already exists
    const emailExists = await checkEmailExists(formData.email)
    if (emailExists) {
      return {
        success: false,
        error: "duplicate_email",
        message: "You have already submitted a message with this email address.",
      }
    }

    // Add submission to Firestore
    const submissionRef = await addDoc(collection(db, "contact-submissions"), {
      ...formData,
      submittedAt: serverTimestamp(),
      status: "new", // Status can be 'new', 'in-progress', 'completed'
    })

    return { success: true, id: submissionRef.id }
  } catch (error) {
    console.error("Error adding contact submission:", error)
    return { success: false, error: "submission_failed", message: error.message }
  }
}

// Get all contact form submissions
export async function getAllContactSubmissions() {
  try {
    const q = query(collection(db, "contact-submissions"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)

    const submissions = []
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() })
    })

    return submissions
  } catch (error) {
    console.error("Error getting contact submissions:", error)
    return []
  }
}

// Update contact submission status
export async function updateContactStatus(id, status) {
  try {
    await updateDoc(doc(db, "contact-submissions", id), {
      status,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating contact status:", error)
    return { success: false, error: error.message }
  }
}

// Delete a contact submission
export async function deleteContactSubmission(id) {
  try {
    await deleteDoc(doc(db, "contact-submissions", id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting contact submission:", error)
    return { success: false, error: error.message }
  }
}
