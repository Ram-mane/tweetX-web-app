// Posts.js

import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Card, CardContent } from '@mui/material';
import { format } from 'date-fns'; // For formatting the timestamp
import { collection, query, onSnapshot,where } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have a file for Firebase configuration
import { useAuth } from './AuthContext';

const Posts = ({ user }) => {
  const [tweets, setTweets] = useState([]);

  // console.log("Post users"+JSON.stringify(user,null,2));

  useEffect(() => {
    console.log('login succesful !');
    if (user) { // Check if user is defined
      // Reference to the 'tweets' collection in Firestore
      const tweetsRef = collection(db, 'tweets');
  
      // Query to get tweets for the specific user
      const userTweetsQuery = query(tweetsRef, where('userId', '==', user.uid));
  
      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(userTweetsQuery, (snapshot) => {
        const updatedTweets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setTweets(updatedTweets);
      });
  
      return () => {
        // Unsubscribe when the component unmounts
        unsubscribe();
      };
    }
  }, [user]);
  

  // Render tweets in the component
  return (
    <div>
      {tweets.map((tweet) => (
        <Card key={tweet.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar alt="User Avatar" src={tweet.userProfileImageUrl} />
              <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                {user.displayName}
              </Typography>
            </div>
            <Typography variant="body1">{tweet.tweet}</Typography>
            <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px' }}>
              {format(tweet.timestamp.toDate(), 'MMMM dd, yyyy hh:mm a')}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
