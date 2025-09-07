import { db } from "./firebase"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
} from "firebase/firestore"

// Helper function to upload image to local storage
async function uploadImage(file) {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to upload image")
    }

    return result.filePath
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Create a new blog post
export async function createBlog(blogData, featuredImage) {
  try {
    // Upload image to local storage
    const imagePath = await uploadImage(featuredImage)

    // Create blog post in Firestore
    const blogRef = await addDoc(collection(db, "blogs"), {
      ...blogData,
      featuredImage: imagePath, // Store the local path
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return { success: true, id: blogRef.id }
  } catch (error) {
    console.error("Error creating blog:", error)
    return { success: false, error: error.message }
  }
}

// Update a blog post
export async function updateBlog(id, blogData, featuredImage = null) {
  try {
    const blogRef = doc(db, "blogs", id)
    const updateData = { ...blogData, updatedAt: serverTimestamp() }

    if (featuredImage) {
      // Upload new image to local storage
      const imagePath = await uploadImage(featuredImage)
      updateData.featuredImage = imagePath
    }

    await updateDoc(blogRef, updateData)
    return { success: true }
  } catch (error) {
    console.error("Error updating blog:", error)
    return { success: false, error: error.message }
  }
}

// Delete a blog post
export async function deleteBlog(id) {
  try {
    await deleteDoc(doc(db, "blogs", id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    return { success: false, error: error.message }
  }
}

// Get all blog posts
export async function getAllBlogs() {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const blogs = []
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() })
    })

    return blogs
  } catch (error) {
    console.error("Error getting blogs:", error)
    return []
  }
}

// Get latest blog posts
export async function getLatestBlogs(count = 5) {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(count))
    const querySnapshot = await getDocs(q)

    const blogs = []
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() })
    })

    return blogs
  } catch (error) {
    console.error("Error getting latest blogs:", error)
    return []
  }
}

// Get a single blog post by ID
export async function getBlogById(id) {
  try {
    const docRef = doc(db, "blogs", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting blog:", error)
    return null
  }
}

// Get a single blog post by slug
export async function getBlogBySlug(slug) {
  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting blog by slug:", error)
    return null
  }
}
