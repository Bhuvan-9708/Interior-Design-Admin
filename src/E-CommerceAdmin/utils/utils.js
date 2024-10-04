import { Store } from 'react-notifications-component';

export const nofification = (msg, type) => {
    Store.addNotification({
        title: msg,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}