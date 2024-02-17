import Base1 from "./Base1";
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Col,
  Row
} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (event, property) => {
    setFormData({ ...formData, [property]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      toast.error(error);
      setError('');
      return;
    }

    setError('');

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        toast.success('Login successful!');
        navigate('/profile');
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.message);
      });
  };

  return (
    <Base1>
      <Col md={{ size: 5, offset: 1 }}>
        <Row>
          <Col md={6} className="offset-md-1 mt-2" style={{ marginLeft: '5px', padding: '10px' }}>
            <Button
              color="transparent"
              size="lg"
              className="btn border-dark px-5 rounded-15"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 6, offset: 1 }} style={{ marginLeft: '5px', paddingTop: '10px', paddingEnd: '10px', paddingBottom: '10px' }}>
            <Card style={{ border: 'none', boxShadow: 'none' }}>
              <CardBody>
                <CardTitle tag="h2" className="mb-4" style={{ opacity: 0.7 }}>
                  Login
                </CardTitle>
                <Form onSubmit={handleSubmit}>
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
                    />
                  </FormGroup>

                  <Button  type="submit" className="btn-ef476f float-end" style={{ backgroundColor: '#ef476f' }}>
                    Login
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

export default Login;
