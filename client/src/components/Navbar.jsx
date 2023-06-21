import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PencilSVG from "../assests/icons/pencil"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logOut } from '../API/userAPI';

import logo from '../assests/images/medium.png';



const MyNavbar = () => {
    const navigate = useNavigate()
    const { user, setUser, authenticated, setAuthenticated } = useContext(UserContext);

    const routeLogin = () => {
        navigate('/login')
    }

    const routeLogout = async () => {
        const user = await logOut();
        setUser("")
        setAuthenticated(false)
        navigate('/')
    }

    const routeCreatePage = () => {
        navigate('/editor?mode=create')
    }

    const routeUser = () => {
        navigate('/user')
    }

    const routeHome = () => {
        navigate('/')
    }


    return <>
        <Navbar bg="white" expand="lg" className="border-bottom border-1 pull-right">
            <Container fluid className='mb-0'>
                <Container>
                    <Row className='d-flex align-items-center'>
                        <Col><div className="d-flex align-items-center">
                            <a href="/" onClick={routeHome}>
                                <img src={logo} alt="Website Logo" className="navbar-logo me-2" style={{ height: '30px', width: 'auto' }} /></a>
                            <span className="fw-bold">Medium</span>
                        </div></Col>
                        <Col md="auto"></Col>
                        <Col ms lg="2">
                            <div className='d-flex gap-2'>
                                {/* If the user logged in just appears the name, has not been logged in can only see the login button */}
                                {user || authenticated ?
                                    <>
                                        <Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { routeUser() }}><div>{user.username}</div></Button>
                                        <Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { routeCreatePage() }}><PencilSVG />
                                        </Button><Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { routeLogout() }}>{`Logout->`}</Button>
                                    </> :
                                    <><Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { routeLogin() }}>{`Login->`}</Button> </>}
                            </div>

                        </Col>
                    </Row>
                </Container>

            </Container>
        </Navbar>


    </>
}


export default MyNavbar;