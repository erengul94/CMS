
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Notification from "../components/Alert"
import  UserContext  from '../context/UserContext';
import { useContext } from 'react';

const MainLayout = (props) => {
    const { notification, setNotification } = useContext(UserContext);

    return <>

        <div> <Navbar /></div>
        {
            notification ? <div><Notification notification={notification} /> </div> : null
        }
        <Outlet />


    </>
}



export default MainLayout;