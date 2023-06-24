import Container from 'react-bootstrap/Container';
import Page from './Page';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { getUserPage, deletePage, getPages } from '../API/pageAPI';
import { updateWebSiteName } from '../API/pageAPI';

import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const UserContent = (props) => {
    const [pages, setPages] = useState([]);
    const [siteName, setSiteName] = useState("");

    const { user, authenticated, setNotification, setWebSiteName } = useContext(UserContext);

    const currentPageName = "user"

    const navigate = useNavigate();

    const removePage = async (pageID) => {
        // console.log(`${pageID} deleted`)
        try {
            await deletePage(pageID)
            setNotification({ message: `Page deleted`, type: "info", seconds: 5000 })
            setPages((oldPages) => (oldPages.filter((page) => (page.ID !== pageID))));

        } catch (error) {
            setNotification({ message: `Page can not deleted`, type: "danger", seconds: 5000 })
        }
    }


    useEffect(() => {
        const _pages = async () => {
            if (user.role === "admin") {
                const pages = await getPages(); // we have the user info here
                setPages(pages)
            }
            else {
                const pages = await getUserPage(user.username);
                setPages(pages)
            }

        };
        _pages();
    }, []);

    const handleNameChange = (event) => {
        setSiteName(event.target.value)
        
    }
    const handleNameSubmit = async (event) => {
        event.preventDefault();
        // console.log("name submitted")
        // console.log(siteName)
        try{
            const resp = await updateWebSiteName(siteName)
            setNotification({ message: `WebSite name is updated`, type: "success", seconds: 3000 })
            setWebSiteName(siteName)
            navigate("/user")
        }catch(err){
        }

    }


    return <>
        <Container fluid className='mt-5'>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <Container >
                        {user.role === "admin" && <Form onSubmit={handleNameSubmit}>
                            <Form.Group controlId='siteName'>
                                <Form.Label>Web App Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={siteName}
                                    onChange={handleNameChange}
                                />
                            </Form.Group>
                            <Button className="m-2 ml-0" variant='primary' type='submit'>
                                Change Name
                            </Button>
                        </Form>}
                        {pages.map((page) => <Page key={page.ID} currentPageName={currentPageName} page={page} user={user} removePage={removePage} />)}
                    </Container>
                </Col>
                <Col xs={2}></Col>

            </Row>
        </Container>
    </>
}





export default UserContent;