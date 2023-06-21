
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'


const MainLayout = (props) => {
    return <>

        <div> <Navbar /></div>

        <Outlet />
        

    </>
}



export default MainLayout;