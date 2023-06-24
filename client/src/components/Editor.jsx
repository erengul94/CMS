// bootstrap
import { Container, Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

// project based imports
import UserContext from '../context/UserContext';
import { createPage, editPage, getPage } from '../API/pageAPI';
import image1 from '../assests/images/image1.png';
import image2 from '../assests/images/image2.png';
import image3 from '../assests/images/image3.png';
import image4 from '../assests/images/image4.png';


// react based imports
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useRef, useContext, useState } from 'react';

// external libraries
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import { getUsers } from '../API/userAPI';



const MyEditor = (props) => {
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode'); // create and edit mode exist, editor works with create mode as a default
  const pageID = params.size ? params.get('pageID') : null; // in the edit mode

  const [existingContent, setExistingContent] = useState('');
  const [editorMode, setEditorMode] = useState(mode ? mode : 'create'); // default create
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState('');

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageOptions, imagePhotoOptions] = useState([
    { id: 1, url: image1 },
    { id: 2, url: image2 },
    { id: 3, url: image3 },
    { id: 4, url: image4 },
  ]);

  const renderCount = useRef(0);

  const { user, authenticated, notification, setNotification } = useContext(UserContext);

  const navigate = useNavigate();

  const quillRef = useRef();

  /// Form operations

  const handleImageSelect = (image) => {
    const range = quillRef.current.getEditor().getSelection(true);
    const index = range ? range.index : existingContent.length;
    quillRef.current.getEditor().insertEmbed(index, 'image', image.url, 'user');
    setSelectedImages([...selectedImages, image]);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    // console.log(value)

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editorMode === "create") {
      handlePost()
    }
    else (
      handleUpdate(pageID)
    )
    // console.log(existingContent);
    // console.log(selectedDate);
  };

  const handleText = (value) => {
    setExistingContent(value);
    // console.log(value)
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log(date)
  };

  const hasHeaderBlock = (content) => {
    // /^<h[1-6]>\s*\S[\s\S]*<\/h[1-6]>$/;
    const headerRegex = /^<h[1-6]>(?!\s*(?:<\/h[1-6]>|<img[^>]*>\s*<\/h[1-6]>))(?!\s*<br\s*\/?>)(?=.*[^\s<>])(?:[\w\W]*?<\/h[1-6]>|(<img[^>]*>)?(?=<\/h[1-6]>))/;
    return headerRegex.test(content);
  };

  const hasContentBlock = (content) => {
    const paragraphRegex = /<p>.*<\/p>/g;
    const imageRegex = /<img.*>/g;
    return paragraphRegex.test(content) || imageRegex.test(content);
  };

  const handlePost = async () => {
    const _page = {
      content: existingContent, username: selectedAuthor, creationDate: dayjs().format('YYYY-MM-DD'),
      publicationDate: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null, title: title
    };
    if (!hasHeaderBlock(existingContent)) {
      setNotification({ message: "Page must have at least one header block", type: "warning", seconds: 5000 })
      return;
    }

    if (!hasContentBlock(existingContent)) {
      setNotification({ message: "Page must have at least one paragraph or image block", type: "warning", seconds: 5000 })
      return;
    }
    try {
      const resp = await createPage(_page);
      setNotification({ message: `Page succesfully created`, type: "info", seconds: 3000 })
      routeHome()

    } catch (err) {
      setNotification({ message: `Page can not created}`, type: "danger", seconds: 5000 })
    }

  };

  const handleUpdate = async (pageID) => {
    const _page = {
      content: existingContent, username: selectedAuthor, ID: pageID,
      creationDate: dayjs().format('YYYY-MM-DD'), publicationDate: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null,
      title: title
    };
    if (!hasHeaderBlock(existingContent)) {
      setNotification({ message: "Page must have at least one header block", type: "warning", seconds: 5000 })
      return;
    }

    if (!hasContentBlock(existingContent)) {
      setNotification({ message: "Page must have at least one paragraph or image block", type: "warning", seconds: 5000 })
      return;
    }
    try {
      const resp = await editPage(_page);
      setNotification({ message: `Page succesfully edited`, type: "info", seconds: 4000 })
      routeHome()

    } catch (error) {
      setNotification({ message: `Page can not edited`, type: "danger", seconds: 5000 })

    }

  };
  //// Form operations end


  useEffect(() => {
    const _page = async () => {
      const allAuthors = await getUsers();
      if (mode === 'edit' && renderCount.current === 0) {
        const page = await getPage(pageID);
        setExistingContent(page.content);
        setSelectedDate(page.publicationDate ? new Date(page.publicationDate) : "");
        setTitle(page.title)
        setAuthors(allAuthors)
        setSelectedAuthor(page.username)
        setEditorMode('edit');
      } else {
        setExistingContent('');
        setSelectedDate("");
        setTitle("")
        setSelectedAuthor(user.username)
        setAuthors(allAuthors)
        setEditorMode('create');
      }
      renderCount.current = renderCount.current + 1;
    };
    _page();
  }, [mode]);

  const routeHome = () => {
    navigate('/');
  };

  const routeBackUserPage = () => {
    navigate("/user")
  }

  const renderPhotoOptions = () => {
    return imageOptions.map((photo) => (
      <Col key={photo.id} xs={6} md={3} className="mb-3">
        <div
          className={`image-option ${selectedImages.includes(photo) ? 'selected' : ''}`}
          onClick={() => handleImageSelect(photo)}
        >
          <img src={photo.url} style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
      </Col>
    ));
  };

  return (<>
    < Container className="m-3 p-5 vh-100" >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="contentTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="contentTitle"
            required={true}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="contentAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Select
                value={selectedAuthor}
                disabled={(user.role === 'user') ? true : false}
                onChange={handleAuthorChange}
              >
                {/* {console.log(authors)} */}
                {/* {console.log(authors)} */}
                {/* {(user.role === 'admin' && editorMode === "edit") ? <option value=""> </option>} */}
                {/* <option value="">{(user.role === 'admin' && mode === "edit") ? selectedAuthor : "Select an author"}</option> */}
                {authors.map((_author) => (
                  <option key={_author.id} value={_author.username}>
                    {_author.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contentDate">
              <Form.Label>Publication Date</Form.Label>
              <br />
              <DatePicker
                selected={selectedDate}
                dateFormat="yyyy-MM-dd"
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <ReactQuill
            ref={quillRef}
            value={existingContent}
            onChange={handleText}
            style={{ height: '20rem' }}
          />
        </Form.Group>
        <Form.Group className="mt-3" controlId="contentImages">
          <Row>{renderPhotoOptions()}</Row>
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="danger" onClick={routeHome} className="me-3">
            Cancel
          </Button>
          {editorMode === 'create' ? (
            <Button variant="success" type="submit">
              Post
            </Button>
          ) : (
            <Button variant="success" type="submit" >
              Edit
            </Button>
          )}
        </div>
      </Form>
    </Container ></>
  );
};

export default MyEditor;
