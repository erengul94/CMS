import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUserInfo } from '../API/userAPI';


const UserContext = createContext();
export default UserContext;
// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState("");
//     const [authenticated, setAuthenticated] = useState(false);
//     const [notification, setNotification] = useState({
//         "type": "",
//         "message": "",
//         "seconds": 3000
//     });

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const user = await getUserInfo(); // current authenticated user
//                 setUser(user)
//                 setAuthenticated(true);
//             }
//             catch (err) {
//                 console.log("Dont worry just you logged out")
//                 setUser("");
//                 authenticated ? setNotification({message: "Session is expired please login again", type:"danger", seconds:5000}):setAuthenticated(false)
//             }
//         };
//         checkAuth();
//     }, []);

//     return (
//         <UserContext.Provider
//             value={{
//                 user,
//                 setUser,
//                 authenticated,
//                 setAuthenticated,
//                 notification,
//                 setNotification,
//             }}
//         >   
        
//             {children}

//         </UserContext.Provider>
//     );


// }

// export default UserProvider;