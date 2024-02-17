import React, { useEffect, useState } from 'react';
import Base2 from './Base2';
import { arrayUnion, collection, onSnapshot ,query,where,getDocs,docs} from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CircularProgress } from '@mui/material';
import UserCard from '../pages/userCard'; // Import the UserCard component
import { useAuth } from './AuthContext';
import { updateUserData } from '../userOpHelper/updateUser';




const Following=()=>{


    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
//   console.log('Following user:', JSON.stringify(currentUser, null, 2));
useEffect(() => {
    if (currentUser) {
      const currUserQuery = query(collection(db, 'users'), where('userId', '==', currentUser.uid));

      const unsubscribe = onSnapshot(currUserQuery, async (snapshot) => {
        try {
          const currUserData = snapshot.docs[0].data();
          const followingUsersIds = currUserData.following || [];

          const followingDetails = await Promise.all(
            followingUsersIds.map(async (followingId) => {
              if (followingId && followingId.userID) {
                const followingUserQuery = query(collection(db, 'users'), where('userId', '==', followingId.userID));
                const followingSnapshot = await getDocs(followingUserQuery);

                if (!followingSnapshot.empty) {
                  return { id: followingSnapshot.docs[0].id, ...followingSnapshot.docs[0].data() };
                } else {
                  console.log(`Following with userId ${followingId.userID} not found.`);
                  return null;
                }
              } else {
                console.log('Invalid followingId:', followingId);
                return null;
              }
            })
          );

          setUsers(followingDetails.filter((following) => following !== null));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching following details:', error);
          setLoading(false);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);
  
  

  const handleFollow = (clickedUsersId) => {
    if (currentUser) {
      updateUserData(currentUser.uid, {
        following: arrayUnion({ userID: clickedUsersId }),
      });

      updateUserData(clickedUsersId, {
        followers: arrayUnion({userId: currentUser.uid}),
      });
    } else {
      console.log('user not found');
    }
  };

  return (
    <div className="container-fluid mt-4">
      {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
      {!loading && (
        <div className="container-fluid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} handleFollow={handleFollow} />
          ))}
        </div>
      )}
    </div>
  );
};


export default Following;