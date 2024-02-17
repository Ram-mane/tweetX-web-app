import React, { useEffect, useState } from 'react';
import Base2 from './Base2';
import { arrayUnion, collection, onSnapshot ,query,where,getDocs,docs} from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CircularProgress } from '@mui/material';
import UserCard from '../pages/userCard'; // Import the UserCard component
import { useAuth } from './AuthContext';
import { updateUserData } from '../userOpHelper/updateUser';

const Followers = () => {
  const [users, setUsers] = useState([]);
  const [currtUser, setCurrtUser] = useState(null);
  
  const { currentUser } = useAuth();
//   console.log('Following user:', JSON.stringify(currentUser, null, 2));
useEffect(() => {
    if (currentUser) {
      const userQuery = query(
        collection(db, 'users'),
        where('userId', '==', currentUser.uid)
      );
  
      const unsubscribe = onSnapshot(userQuery, async (snapshot) => {
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setCurrtUser(userData);
          const followersUserId = userData.followers || [];
  
          console.log("following users"+JSON.stringify(userData, null, 2))
          // Fetch details for each follower
          const followersDetails = await Promise.all(
            followersUserId.map(async (followerId) => {
              if (followerId && followerId.userId) {
                const followerUserQuery = query(
                  collection(db, 'users'),
                  where('userId', '==', followerId.userId)
                );
                const followerSnapshot = await getDocs(followerUserQuery);
  
                if (!followerSnapshot.empty) {
                  return { id: followerSnapshot.docs[0].id, ...followerSnapshot.docs[0].data() };
                } else {
                  console.log(`Follower with userId ${followerId.userId} not found.`);
                  return null;
                }
              } else {
                console.log('Invalid followerId:', followerId);
                return null;
              }
            })
          );
  
          setUsers(followersDetails.filter((follower) => follower !== null));
        } else {
          console.log('No matching user document found for userId:', currentUser.uid);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);
  
  let currUserData = currtUser;

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
        { (
          <div className="container-fluid">
            {users.map((user) => (
              <UserCard key={user.id} user={user} handleFollow={handleFollow} />
            ))}
          </div>
        )}
      </div>
    
  );
 }


export default Followers;
