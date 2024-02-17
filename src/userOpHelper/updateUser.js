// firebaseUtils.js
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateUserData = async (userId, newData) => {
  try {
    // Query for the document with matching userId
    const userQuery = query(collection(db, 'users'), where('userId', '==', userId));

    // Get the documents that match the query
    const querySnapshot = await getDocs(userQuery);

    // Check if there is a matching document
    if (!querySnapshot.empty) {
      // Assuming there is only one matching document
      const userDoc = querySnapshot.docs[0];

      // Check if newData is an object and not undefined
      if (typeof newData === 'object' && newData !== null) {
        // Update the document with new data
        await updateDoc(doc(db, 'users', userDoc.id), newData);

        console.log('User data updated successfully');
      } else {
        console.log('Invalid data provided for update');
      }
    } else {
      console.log('No matching document found for userId:', userId);
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};
