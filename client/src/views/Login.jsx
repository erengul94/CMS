import { useContext } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../API/userAPI'
import Notification from '../components/Alert';

import  UserContext  from '../context/UserContext';



const LoginForm = (props) => {
  const navigate = useNavigate()

  const { user, setUser, authenticated, setAuthenticated, notification, setNotification } = useContext(UserContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    // console.log(username, password)
    try {
      event.preventDefault();
      const credentials = { username, password }
      const user = await logIn(credentials);
      setUser({ "username": user.username, "email": user.email, "role": user.role })
      setAuthenticated(true)
      setNotification({message: `${user.username} successfully logged in `, type:"success", seconds:4000})
      navigate("/")

    } catch (err) {
      setNotification({ message: 'Login failed. Please check your credentials.', type: 'danger', seconds:3000 });
      // console.log("error occured")
    }
  };



  return (
    <Container className='p-5'>
      
      <Row>
        <Col xs={3}></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
              <Form.Text className="text-muted">
                We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {notification && <div className="text-danger mt-2">{notification.message}</div>}

        </Col>
        <Col xs={3}></Col>

      </Row>
    </Container>

  );
}

export default LoginForm;