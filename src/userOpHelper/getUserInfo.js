import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getUserData = async (userId,field) => {
  const userQuery = query(collection(db, "users"), where("userId", "==", userId));
  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    console.log("userSnapshot.docs[0].data()", userSnapshot.docs[0].data()[field]);
    return userSnapshot.docs[0].data()[field];
  }
  return null;
  
};

