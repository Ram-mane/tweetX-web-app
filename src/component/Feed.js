import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography, Container, Avatar, CircularProgress } from '@mui/material';
import Base2 from './Base2';
import { formatDistanceToNow} from 'date-fns';
import { useAuth } from './AuthContext';
import { db, addDoc, Timestamp } from '../firebase';
import { collection, onSnapshot, query, arrayUnion, where, orderBy } from 'firebase/firestore';
import { updateUserData } from '../userOpHelper/updateUser';
import { getUserData } from '../userOpHelper/getUserInfo';
import { ToastContainer ,toast } from 'react-toastify';

const Feed = () => {
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  



  const handleTweetSubmit = async () => {
    if (tweetText.length > 0 && tweetText.length <= 800) {
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
    } else {
      toast.error('Tweet must be between 1 to 500 charecters');
      console.error('Tweet must be between 1 and 500 characters');
    };
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
    const fetchTweets = async () => {
      try {
        if (currentUser && currentUser.uid) {
          
            const tweetsQuery = query(
              collection(db, 'tweets'),
              orderBy('timestamp', 'desc')
            );
            const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
              const tweetsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              setTweets(tweetsData);
              setLoading(false);
            });
            return () => {
              unsubscribe();
            };
          

        
        } else {
          console.error('Error! currentUser not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false);
      }
    };
    

    setLoading(true);
    fetchTweets();
  }, [currentUser]);

  return (
    <Base2>
      <Container className='col-4'>
        <TextField
          label="Write your tweet (up to 3 sentences)"
          multiline
          rows={3}
          fullWidth
          value={tweetText}
          required
          onChange={(e) => setTweetText(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleTweetSubmit} style={{ marginTop: '10px' }}>
          {tweetText.length > 0 && tweetText.length <= 800 ? 'Tweet' : 'write tweet'}
        </Button>

        <div style={{ marginTop: '20px' }}>
          {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
          {!loading &&
            tweets.map((tweet) => (
              <Card key={tweet.id} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Avatar alt="User Avatar" src={tweet.userProfileImageUrl} />
                    <Typography variant="h5" style={{ marginLeft: '10px' }}>
                      {tweet.username}
                    </Typography>
                  </div>
                  <Typography variant="body1">{tweet.tweet}</Typography>
                  <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px' }}>
                     {formatDistanceToNow(tweet.timestamp.toDate(), { addSuffix: true })}
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
