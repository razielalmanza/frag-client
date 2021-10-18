import axios from "axios";

let url = process.env.REACT_APP_URL;

export const login = (user) => {
  return axios
    .post(url + "/login", {
      usuario: user.usuario,
      password: user.password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
