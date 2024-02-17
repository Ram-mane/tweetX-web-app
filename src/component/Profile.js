import React, { useEffect } from 'react';
import Base2 from './Base2';
import { Avatar, Typography, Button, Grid } from '@mui/material';
import { Card, Row, Col, Container } from 'reactstrap';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import { useState } from 'react';
import Posts from './Posts';
import Followers from './Followers';
import Following from './Following';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
  const [showPosts, setShowPosts] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [currUserData, setCurrUserData] = useState();

  // Handler function to toggle the visibility of the Posts component
  const handlePostsClick = () => {
    setShowPosts(true);
    setShowFollowers(false);
    setShowFollowing(false);
  };

  const handleFollowersClick = () => {
    setShowPosts(false);
    setShowFollowers(true);
    setShowFollowing(false);
  };

  const handleFollowingClick = () => {
    setShowPosts(false);
    setShowFollowers(false);
    setShowFollowing(true);
  };

  const { currentUser } = useAuth();
  console.log("profile user: " + currentUser);

  useEffect(() => {
    if (currentUser) {
      const userRef = query(collection(db, 'users'), where('userId', '==', currentUser.uid));

      getDocs(userRef)
        .then((snapshot) => {
          if (!snapshot.empty) {
            const userData = {
              ...snapshot.docs[0].data(),
            };

            setCurrUserData(userData);
            console.log('progile curr user data '+ JSON.stringify(currUserData, null, 2));
          } else {
            console.log(`User not found for userId: ${currentUser.uid}`);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [currentUser]);

  return (
    <Base2>
      <Card md={{ size: 8, offset: 2 }} className="mx-auto mt-4 p-3" style={{ maxWidth: '600px' }}>
        <Row className="align-items-center">
          {/* Profile Photo */}
          <Col xs="auto" style={{ paddingRight: '20px', paddingTop: '0px' }}>
            <Avatar alt="Profile Photo" src="/path/to/profile-photo.jpg" sx={{ width: 100, height: 100 }} />
          </Col>

          {/* Name */}
          <Col md={{ size: 7, offset: 2 }}>
            <Typography variant="h4" className='mt-5 ml-2' gutterBottom>
              {currentUser ? currentUser.displayName : 'Arjun Reddy'}

              {/* Post, Followers, Following Section */}
              <Row className="align-items-center mt-2">
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Post
                  </Typography>
                  <Typography variant="caption">{currUserData?.tweets?.length}</Typography>
                </Col>
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Followers
                  </Typography>
                  <Typography variant="caption">{currUserData?.followers?.length}</Typography>
                </Col>
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Following
                  </Typography>
                  <Typography variant="caption">{currUserData?.following?.length}</Typography>
                </Col>
              </Row>
            </Typography>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="divider" />

        {/* Material-UI Tags Section */}
        <Container>
          <Row className='p--1'>
            <Col xs="auto" style={{ paddingRight: '60px' }} className="d-flex justify-content-start">
              <Button variant="text" color="primary" size="sm" onClick={handlePostsClick}>
                <ChatTwoToneIcon style={{ marginRight: '5px' }} />
                Posts
              </Button>
            </Col>
            <Col xs="auto" style={{ paddingRight: '60px' }} className="d-flex justify-content-center">
              <Button variant="text" color="primary" size="sm" onClick={handleFollowersClick}>
                <ChatTwoToneIcon style={{ marginRight: '5px' }} />
                Followers
              </Button>
            </Col>
            <Col xs="auto" style={{ paddingRight: '10px', paddingTop: '0px' }} className="d-flex justify-content-end">
              <Button variant="text" color="primary" size="sm" onClick={handleFollowingClick}>
                <ChatTwoToneIcon style={{ marginRight: '5px' }} />
                Following
              </Button>
            </Col>
          </Row>
        </Container>
        {/* Conditionally render Posts component */}
        {showPosts && <Posts user={currentUser} />}
        {showFollowers && <Followers/>}
        {showFollowing && <Following />}
      </Card>
    </Base2>
  );
};

export default Profile;
