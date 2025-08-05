

import { db } from "./firebase" // Assuming db is initialized here
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
  Timestamp, 
} from "firebase/firestore"



// Mock data to simulate Firestore documents
const mockDeleteRequests = [
  {
    id: "5yGtyWUc6Mb7RibWWLm0",
    createdAt: "2025-08-05T08:18:50.468Z",
    email: "sigdbidur@gmail.com",
    password: "sfae frewa efaw",
    reason: "sdfa eraw rfaewr fasf dsfaf awre wfsadf sadf sadfewrfaf",
    status: "pending",
    timestamp: Timestamp.fromDate(new Date("2025-08-05T14:03:50+05:45")),
  },
  {
    id: "7xznGF0FIQDMJEbq4hLg",
    createdAt: "2025-08-04T10:00:00.000Z",
    email: "another@example.com",
    password: "someotherpassword",
    reason: "User requested account deletion due to privacy concerns.",
    status: "pending",
    timestamp: Timestamp.fromDate(new Date("2025-08-04T10:00:00+05:45")),
  },
  {
    id: "iCJeANaZDbyKAqbLaMJY",
    createdAt: "2025-08-03T15:30:00.000Z",
    email: "test@user.com",
    password: "testpassword123",
    reason: "Testing delete request functionality.",
    status: "completed",
    timestamp: Timestamp.fromDate(new Date("2025-08-03T15:30:00+05:45")),
  },
]

// Get all delete requests
export async function getAllDeleteRequests() {
  try {
    const q = query(collection(db, "deleteRequests"), orderBy("timestamp", "desc"))
    const querySnapshot = await getDocs(q)
    const requests = []
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() })
    })
    return requests
  } catch (error) {
    console.error("Error getting delete requests:", error)
    return []
  }
}

// Add a new delete request
export async function addDeleteRequest(
  formData,
) {
  try {
    const docRef = await addDoc(collection(db, "deleteRequests"), {
      ...formData,
      createdAt: new Date().toISOString(), // Store as ISO string to match image
      timestamp: serverTimestamp(), // Use serverTimestamp for consistency
      status: "pending",
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error adding delete request:", error)
    return { success: false, error: error.message }
  }
}

// Update delete request status
export async function updateDeleteRequestStatus(
  id,
  status,
) {
  try {
    await updateDoc(doc(db, "deleteRequests", id), {
      status,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating delete request status:", error)
    return { success: false, error: error.message }
  }
}

// Delete a delete request
export async function deleteDeleteRequest(id) {
  try {
    await deleteDoc(doc(db, "deleteRequests", id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting delete request:", error)
    return { success: false, error: error.message }
  }
}
