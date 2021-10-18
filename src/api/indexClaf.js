import axios from "axios";

let url = "safe-holder"; //Modificar la url ya sea para Pruebas o desarrollo

const instance = axios.create({
  baseURL: url,
  responseType: "json",
  headers: { accept: "*/*", "Content-Type": "application/json;charset=utf-8" },
});

instance.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
