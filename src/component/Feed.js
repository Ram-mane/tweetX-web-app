import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography, Container,Avatar } from '@mui/material';
import Base2 from './Base2';
import {format} from 'date-fns';
import { useAuth } from './AuthContext';
import { db,  addDoc, Timestamp } from '../firebase'; // Assuming you have a file for Firebase configuration
import { collection,  doc,  onSnapshot, query, setDoc, updateDoc, where,arrayUnion } from "firebase/firestore"; 
import { updateUserData } from '../userOpHelper/updateUser';

const Feed = () => {
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);
  const { currentUser } = useAuth();

  const handleTweetSubmit = async () => {
    try {
      if (currentUser && currentUser.uid) {
        const tweetDocRef = await addTweetToFirestore();
        updateUserData(currentUser.uid, {
          tweets: arrayUnion({ tweetId: tweetDocRef.id, tweetText }),
        });
        setTweetText('');
      } else {
        console.error('User object is null or missing uid property');
      }
    } catch (error) {
      console.error('Error submitting tweet:', error);
    }
  };

  const addTweetToFirestore = async () => {
    const tweetsRef = collection(db, 'tweets');
    return await addDoc(tweetsRef, {
      tweet: tweetText,
      timestamp: Timestamp.fromDate(new Date()),
      userId: currentUser.uid,
      username: currentUser.displayName,
    });
  };

  useEffect(() => {
    const tweetRef = collection(db, 'tweets');
    if (currentUser) {
      const usersTweetQuery = query(tweetRef, where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(usersTweetQuery, (snapshot) => {
        const updatedTweets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(updatedTweets);
      });
      return () => {
        unsubscribe();
      };
    } else {
      console.error('Error! currentUser not found');
    }
  }, [currentUser]);

  return (
    <Base2>
      <Container>
        <TextField
          label="Write your tweet (up to 3 sentences)"
          multiline
          rows={3}
          fullWidth
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleTweetSubmit} style={{ marginTop: '10px' }}>
          Tweet
        </Button>

        <div style={{ marginTop: '20px' }}>
          {tweets.map((tweet) => (
            <Card key={tweet.id} style={{ marginBottom: '10px' }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Avatar alt="User Avatar" src={tweet.userProfileImageUrl} />
                  <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                    {currentUser.displayName}
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
      </Container>
    </Base2>
  );
};

export default Feed;