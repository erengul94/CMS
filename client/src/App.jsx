import { useState } from 'react';
// import { Button, Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './views/MainLayout';
import Login from './views/Login';

import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyEditor from './components/Editor';
import UserContent from './components/User';


import UserProvider from './context/UserContext';



function App() {

  // const [guess, setGuess] = useState(100);

  // const newGuess = async () => {
  //   try {
  //     const n = await getGuess();
  //     setGuess(n);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (

    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" >
              <Route index element={<MainContent />} />
              <Route path="editor" element={<MyEditor />} />
              <Route path="user" element={<UserContent />} />
              <Route path="*" element={"404"}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App
