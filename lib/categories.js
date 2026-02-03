import { db } from "./firebase"
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

// Create a new category
export async function createCategory(name) {
  try {
    if (!db) {
      throw new Error("Firebase not configured");
    }
    
    const categoryRef = await addDoc(collection(db, "categories"), {
      name,
      createdAt: serverTimestamp(), 
    })

    return { success: true, id: categoryRef.id }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message }
  }
}

// Get all categories
export async function getCategories() {
  try {
    if (!db) {
      console.warn("Firebase not configured, returning empty categories array");
      return [];
    }
    
    const q = query(collection(db, "categories"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const categories = []
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() })
    })

    return categories
  } catch (error) {
    console.error("Error getting categories:", error)
    return []
  }
}

// Delete a category
export async function deleteCategory(id) {
  try {
    if (!db) {
      throw new Error("Firebase not configured");
    }
    
    await deleteDoc(doc(db, "categories", id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: error.message }
  }
}
