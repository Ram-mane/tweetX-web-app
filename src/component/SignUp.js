import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Col, Row, FormFeedback } from 'reactstrap';
import Base1 from './Base1';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth,db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from 'firebase/firestore';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (event, property) => {
    setFormData({ ...formData, [property]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm Password logic
    if (formData.password !== formData.confirmPassword) {
      setError('Please confirm the password');
      toast.error(error);
      setError('');
      return;
    }

    //  validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      toast.error(error)
      setError('');
      return;
    }

    setError('');

    try {
      const resp = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const user = resp.user;

      console.log(user)

      await updateProfile(user, {
        displayName: formData.name,
      });

      // adding user details to the firestore

      const userRef = collection(db,'users');
      await addDoc(userRef,{
        username:formData.name,
        eamil:formData.email,
        password: formData.password,
        userId: user.uid,
        timeStamp: new Date(),
        followers: [],
        following :[],
        
        tweets:[],
      });



      // await db.collection('users').doc

      toast.success('Account created successfully !');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        // Navigate to the login page
        navigate('/login');
      }, 3500);

    } catch (err) {
      console.error('Error:', err);
      toast.error(err.message);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Base1>
      <Col md={{ size: 8, offset: 1 }}>
        <Row>
          <Col md={3} className="offset-md-1 mt-2" style={{ marginLeft: '5px', padding: '10px' }}>
            <Button color="transparent" size="lg" className="btn border-dark px-5 rounded-15" onClick={handleLogin}>
              Login
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 4, offset: 1 }} style={{ marginLeft: '5px', paddingTop: '10px', paddingEnd: '10px', paddingBottom: '10px' }}>
            <Card style={{ border: 'none', boxShadow: 'none' }}>
              <CardBody>
                <CardTitle tag="h2" className="mb-4" style={{ opacity: 0.7 }}>
                  Create Account
                </CardTitle>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      onChange={(e) => handleChange(e, 'name')}
                      value={formData.name}
                      required
                      className="border-0 bg-light mb-4 p-3"
                      invalid={error !== ''}
                    />
                    
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={(e) => handleChange(e, 'email')}
                      value={formData.email}
                      required
                      className="border-0 bg-light mb-4 p-3"
                      invalid={error !== ''}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => handleChange(e, 'password')}
                      value={formData.password}
                      required
                      className="border-0 bg-light mb-4 p-3"
                      invalid={error !== ''}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) => handleChange(e, 'confirmPassword')}
                      value={formData.confirmPassword}
                      required
                      className="border-0 bg-light mb-4 p-3"
                      invalid={error !== ''}
                    />
                  </FormGroup>

                  <Button type="submit" className="btn-ef476f float-end" style={{ backgroundColor: '#ef476f' }}>
                    Sign Up
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>

      {/* ToastContainer for displaying messages */}
      <ToastContainer />
    </Base1>
  );
};

export default CreateAccount;
