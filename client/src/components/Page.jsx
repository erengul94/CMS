
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Row } from 'react-bootstrap';
import DeleteIconSVG from '../assests/icons/delete';
import EditSVG from '../assests/icons/edit';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

const Page = (props) => {

    const navigate = useNavigate();
    const sanitizedContent = DOMPurify.sanitize(props.page.content);

    const editPage = (pageID) => {
        const url = `/editor?mode=edit&pageID=${pageID}`
        navigate(url)
    }

    return <>
        <Container fluid className='m-4 border-top border-1'>
            <Row className='m-4'>
                <Col>
                    <div><h5><b>{props.page.title}</b></h5></div>
                    <p>{`Created By @` + props.page.username}</p>

                    <div>
                        <p className='text-break'>{<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />}</p>
                    </div>
                    <div className='d-flex gap-4'>
                        <a className="text-dark" onClick={() => { }}><h7 >{"Read More"}</h7></a>
                        {props.user.username === props.page.username || props.user.role === "admin" ?
                            <><Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { props.removePage(props.page.ID) }}><DeleteIconSVG /></Button>
                                <Button className="btn btn-outline-dark float-end" variant="outline-dark" onClick={() => { editPage(props.page.ID) }}><EditSVG /></Button> </>
                            : null
                        }
                    </div>
                    <div className="d-flex gap-3 pt-3">
                        {props.page.status === "published" ? <div className=""> <span className='text-secondary'>Published at: {props.page.publicationDate} </span> </div> : null}
                        {props.currentPageName === "user" ? <div className=""><span className='text-secondary'>Status : {props.page.status} </span></div> : null}

                    </div>
                </Col>
                {/* <Col>photo</Col> */}
            </Row>
        </Container>
    </>
}


export default Page;