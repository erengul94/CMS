import Container from 'react-bootstrap/Container';
import Page from './Page';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { getPages, deletePage } from '../API/pageAPI';
import  UserContext  from '../context/UserContext';


const MainContent = (props) => {

    const [pages, setPages] = useState([]);
    const { user, authenticated, setNotification } = useContext(UserContext);

    const currentPageName = "main"


    const removePage = async (pageID) => {
        // console.log(`${pageID} deleted`)
        try {
            await deletePage(pageID)
            setPages((oldPages) => (oldPages.filter((page) => (page.ID !== pageID))));
            setNotification({ message: `Page deleted`, type: "info", seconds: 3000 })

        } catch (error) {
            setNotification({ message: `Page can not deleted`, type: "danger", seconds: 5000 })
        }
    }

    useEffect(() => {
        const _pages = async () => {
            // console.log("pages fetch")
            const _pages = await getPages(); // we have the user info here
            const filteredPages = _pages.filter(page => page.status === 'published');
            setPages(filteredPages)
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





export default MainContent;