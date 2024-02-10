import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography, Container } from '@mui/material';
import Base2 from './Base2';
import { useAuth } from './AuthContext';
import { db, myCollection, addDoc, Timestamp } from '../firebase'; // Assuming you have a file for Firebase configuration
import { collection, doc, setDoc } from "firebase/firestore"; 

const Feed = () => {
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);
  
  const { user } = useAuth();

  const handleTweetSubmit = async () => {
    try {
      console.log('User object:', user);
  
      // Check if the user object exists and has a 'uid' property
      if (user && user.uid) {
        const tweetsRef = collection(db, "tweets");
  
        await addDoc(tweetsRef, {
          tweet: tweetText,
          timestamp: Timestamp.fromDate(new Date()),
          userId: user.uid,
          username: user.displayName,
        });
  
        setTweetText('');
      } else {
        console.error('User object is null or missing uid property');
      }
    } catch (error) {
      console.error('Error submitting tweet:', error);
    }
  };

//   useEffect(() => {
//     const unsubscribe = db.collection('tweets').onSnapshot((snapshot) => {
//       setTweets(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

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
                <Typography variant="body1">{tweet.data.tweet}</Typography>
                {/* You can add more details like timestamp, user info, etc. as needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Base2>
  );
};

export default Feed;
