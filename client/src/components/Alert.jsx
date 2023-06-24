import { useContext, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import  UserContext  from '../context/UserContext';

const Notification = (props) => {
    const { notification, setNotification } = useContext(UserContext);


    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification({message:null, type:null});
            }, notification.seconds); // 3 seconds as a default
 
            return () => {
                clearTimeout(timer);
            };
        }
    }, [notification]);

    return (
        <Alert variant={props.notification.type} >
            {props.notification.message}
        </Alert>
    );
};

export default Notification;