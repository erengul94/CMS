import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



import MyEditor from './components/Editor';
import UserContent from './components/User';
import NotFound from './views/NotFound';
import MainContent from './components/MainContent';
import MainLayout from './views/MainLayout';
import Login from './views/Login';


import UserContext from './context/UserContext';
import { getUserInfo } from './API/userAPI';
import { getWebSiteName } from './API/pageAPI';



function App() {

  const [user, setUser] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [notification, setNotification] = useState({
    "type": "",
    "message": "",
    "seconds": 3000
  });
  const [webSiteName, setWebSiteName] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const website = await getWebSiteName()
        // console.log(website)
        setWebSiteName(website.name)
      } catch (err) { }
      try {
        const user = await getUserInfo(); // current authenticated user
        setUser(user)
        setAuthenticated(true);
      }
      catch (err) {
        console.log("Dont worry just you logged out")
        setUser("");
        setAuthenticated(false);

        authenticated ? setNotification({ message: "Session is expired please login again", type: "danger", seconds: 5000 }) : setAuthenticated(false)
      }
    };
    checkAuth();
  }, []);

  return (

    <UserContext.Provider value={{
      user,
      setUser,
      authenticated,
      setAuthenticated,
      notification,
      setNotification,
      webSiteName,
      setWebSiteName
    }}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" >
              <Route index element={<MainContent />} />
              <Route path="editor" element={authenticated ? <MyEditor /> : <MainContent />} />
              <Route path="user" element={authenticated ? <UserContent /> : <MainContent />} />
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  )
}

export default App
