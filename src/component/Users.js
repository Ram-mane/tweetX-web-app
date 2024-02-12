import { useEffect, useState } from "react";
import Base2 from "./Base2";
import { arrayUnion, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Unsubscribe } from "@mui/icons-material";
import { Button, Card, CardContent, TextField, Typography, Container, Avatar, CircularProgress } from '@mui/material'; // Import CircularProgress
import { Col } from "reactstrap";
import { useAuth } from "./AuthContext";
import { updateUserData } from "../userOpHelper/updateUser";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const { currentUser } = useAuth();

    const handleFollow = () => {
        if (currentUser && users) {
            updateUserData(currentUser.uid, {
                following: arrayUnion(users.userId)
            });

            updateUserData(users.userId, {
                followers: arrayUnion(currentUser.uid)
            });
        } else {
            console.log('user not found');
        }
    };

    useEffect(() => {
        console.log("effect triggered in users component");
        const userRef = collection(db, 'users');

        const unsubscribe = onSnapshot(userRef, (snapshot) => {
            const updatedUsers = snapshot.docs.map((doc) => {
                const userData = {
                    id: doc.id,
                    ...doc.data(),
                };
                console.log("User data:", userData);
                return userData;
            }).filter(doc => doc.userId !== currentUser.userId);

            console.log('All users:', updatedUsers);

            setUsers(updatedUsers);
            setLoading(false); // Set loading to false once data is loaded
        });

        return () => {
            unsubscribe();
        };
    }, [currentUser]);

    return (
        <Base2>
            <Col md={{ size: 4, offset: 4 }}>
                <Container>
                    {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />} {/* Show CircularProgress while loading */}
                    {!loading && (
                        <div style={{ marginTop: '20px' }}>
                            {users.map((user) => (
                                <Card key={user.id} style={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <Avatar alt="User Avatar" src={user.userProfileImageUrl} />
                                            <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                                {user.username}
                                            </Typography>
                                        </div>
                                        <Typography variant="caption">{user.followers}</Typography>
                                        <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px' }}>
                                            {user.following}
                                        </Typography>
                                        {/* Follow button or any other action */}
                                        <Button onClick={() => handleFollow(user.id)} color="primary">
                                            Follow
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </Container>
            </Col>
        </Base2>
    );
}

export default Users;
