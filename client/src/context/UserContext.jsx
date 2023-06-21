import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../API/userAPI';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    // const navigate = useNavigate("/")


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getUserInfo(); // current authenticated user
                setUser(user)
                setAuthenticated(true);
            }
            catch (err) {
                console.log("Dont worry just you logged out")
                setUser("");
                setAuthenticated(false)
            }
        };
        checkAuth();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                authenticated,
                setAuthenticated
            }}
        >
            {children}

        </UserContext.Provider>
    );


}

export default UserProvider;