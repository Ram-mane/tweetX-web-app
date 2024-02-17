import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../component/AuthContext';
import { useState ,useEffect} from 'react';
import { db } from '../firebase';
 // Update with your actual path to useAuth

const UserCard = ({ user, handleFollow }) => {
  const { currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      const userDocRefQuery = query(collection(db, 'users'), where('userId', '==', currentUser.uid));
      const userDocSnapshot = await getDocs(userDocRefQuery);

      if (!userDocSnapshot.empty) {
        const currentUserData = userDocSnapshot.docs[0].data();
        setIsFollowing(currentUserData.following.some((following) => following.userID === user.userId));
      }
    };

    checkFollowing();
  }, [currentUser.uid, user.userId,handleFollow]);

  return (
    <Card className="container-fluid mt-4">
      <CardContent className="d-flex flex-column flex-md-row justify-content-between ">
        <div className="d-flex">
          <Avatar alt="User Avatar" src={user.userProfileImageUrl} sx={{ width: 100, height: 100 }} />
          <div className="ms-3">
            <Typography variant="h5" gutterBottom>
              {user.username}
              <Typography variant="body1">Followers: {user.followers.length}</Typography>
              <Typography variant="body1">Following: {user.following.length}</Typography>
            </Typography>
          </div>
        </div>
        <div className="mt-3  mt-md-0">
          <Button onClick={() => handleFollow(user.userId)} variant="contained" color="primary">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
