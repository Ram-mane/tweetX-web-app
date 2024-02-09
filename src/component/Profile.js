import React from 'react';
import Base2 from './Base2';
import { Avatar, Typography, Button, Divider, Grid } from '@mui/material';
import { Card, Row, Col, Container } from 'reactstrap';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import { useState } from 'react';
import Posts from './Posts';
import Followers from './Followers';
import Following from './Following';
import {useNavigate} from 'react-router-dom'

const Profile = () => {

    const [showPosts, setShowPosts] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);            

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

    
  return (
    <Base2>
      <Card md={{ size: 8, offset: 2 }} className="mx-auto mt-4 p-3" style={{ maxWidth: '600px'}}>
        <Row className="align-items-center">
          {/* Profile Photo */}
          <Col xs="auto" style={{ paddingRight: '20px' ,paddingTop:'0px'}}>
            <Avatar alt="Profile Photo" src="/path/to/profile-photo.jpg" sx={{ width: 100, height: 100 }} />
          </Col>

          {/* Name */}
          <Col md={{ size: 7, offset: 2 }}>
            <Typography variant="h4" className='mt-5 ml-2' gutterBottom>
              Arjun Reddy
              {/* Post, Followers, Following Section */}
              <Row className="align-items-center mt-2">
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Post
                  </Typography>
                  <Typography variant="caption">100</Typography>
                </Col>
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Followers
                  </Typography>
                  <Typography variant="caption">500</Typography>
                </Col>
                <Col xs="auto" className="d-flex flex-column align-items-center">
                  <Typography variant="body2" className="text-muted small mb-1">
                    Following
                  </Typography>
                  <Typography variant="caption">200</Typography>
                </Col>
              </Row>
            </Typography>
          </Col>
        </Row>

        {/* Divider */}
        {/* Horizontal Line */}
        <hr style={{ border: '1px solid #000' }} />

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
          <Col xs="auto" style={{ paddingRight: '10px',paddingTop:'0px' }} className="d-flex justify-content-end">
            <Button variant="text" color="primary" size="sm" onClick={handleFollowingClick}>
              <ChatTwoToneIcon style={{ marginRight: '5px' }} />
              Following
            </Button>
          </Col>
        </Row>
        </Container>
        {/* Conditionally render Posts component */}
        {showPosts && <Posts />}
        {showFollowers && <Followers />}
        {showFollowing && <Following />}
        </Card>
    </Base2>
  );
};

export default Profile;
