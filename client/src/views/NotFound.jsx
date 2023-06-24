import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const NotFound = () => {

    const navigate = useNavigate();

    const routeHome = () => {
        navigate("/")
    }


    return (
        <Container className="text-center">
            <h1>Not Found</h1>
            <p>Opppss, We do not have this page....</p>
            <Button variant="primary" onClick={()=>routeHome()}>Turn the home page</Button>

        </Container>
    );
};

export default NotFound;
