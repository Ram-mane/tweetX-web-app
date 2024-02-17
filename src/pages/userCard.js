import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';

const UserCard = ({ user, handleFollow }) => {
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
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
