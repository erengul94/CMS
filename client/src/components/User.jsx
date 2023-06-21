

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Page from './Page';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { getUserPage, deletePage } from '../API/pageAPI';
import { UserContext } from '../context/UserContext';


const UserContent = (props) => {
    const [pages, setPages] = useState([]);
    const { user, authenticated } = useContext(UserContext);


    const currentPageName = "user"

    const removePage = async (pageID) => {
        console.log(`${pageID} deleted`)
        await deletePage(pageID)
        setPages((oldPages) => (oldPages.filter((page) => (page.ID !== pageID))));
    }


    useEffect(() => {
        const _pages = async () => {
            console.log("pages fetch")
            console.log(user.id)
            const pages = await getUserPage(user.id);
            setPages(pages)
        };
        _pages();
    }, []);

    return <>
        <Container fluid className='mt-5'>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <Container >
                        {pages.map((page) => <Page key={page.ID} currentPageName={currentPageName} page={page} user={user} removePage={removePage} />)}
                    </Container>
                </Col>
                <Col xs={2}></Col>

            </Row>
        </Container>
    </>
}





export default UserContent;