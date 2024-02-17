import React, { useEffect, useState } from 'react';
import Base2 from './Base2';
import { arrayUnion, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CircularProgress } from '@mui/material';
import UserCard from '../pages/userCard'; // Import the UserCard component
import { useAuth } from './AuthContext';
import { updateUserData } from '../userOpHelper/updateUser';
import { Col } from 'reactstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const userRef = collection(db, 'users');

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const updatedUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((doc) => doc.userId !== currentUser.userId);

      setUsers(updatedUsers);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
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
    <Base2>
      <div class="container text-center">
          <div class="row">
            <div class="col col-lg-2">
              
            </div>
            <div class="col-md-auto">
            <div className="container-fluid mt-4">
            {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
            {!loading && (
              <div >
                {users.map((user) => (
                  <UserCard key={user.id} user={user} handleFollow={handleFollow} />
                ))}
              </div>
            )}
      </div>
            </div>
            <div class="col col-lg-2">
              
            </div>
          </div>
        </div>
    </Base2>
  );
};


export default Users;
