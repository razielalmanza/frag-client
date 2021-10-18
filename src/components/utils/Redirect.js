import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const redirige = () => {
  window.history.back();
};
export const redirect = () => {
  store.addNotification({
    title: "Error",
    message: "Inicia sesión.",
    type: "danger",
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    onRemoval: (id, removedBy) => {
      redirige();
    },
    dismiss: {
      duration: 2400,
    },
  });
};

export default redirect;
