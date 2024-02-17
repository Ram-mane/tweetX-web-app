import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getUserInfo = async (userId) => {
  try {
    const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userData = userQuerySnapshot.docs[0].data();
      console.log("user data:", userData.username);
      return userData; // Return the actual data, not a Promise
    } else {
      console.log("No matching document found for userId:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

