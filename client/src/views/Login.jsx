import { useContext } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../API/userAPI'

import { UserContext } from '../context/UserContext';



const LoginForm = (props) => {
  const navigate = useNavigate()

  const { user, setUser, authenticated, setAuthenticated } = useContext(UserContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(authenticated)
  const handleSubmit = async (event) => {
    try {

      event.preventDefault();
      const credentials = { username, password }
      const user = await logIn(credentials);
      console.log(`FETCHED USER ${user}`)
      setUser({ "username": user.username, "email": user.email, "role": user.role })
      setAuthenticated(true)
      navigate("/")

    } catch (err) {
      console.log(err);
      // setMessage({msg: err, type: 'danger'});
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
        </Col>
        <Col xs={3}></Col>

      </Row>
    </Container>

  );
}

export default LoginForm;