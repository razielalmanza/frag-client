import api from "./index";

export const fragmentoConSegmentos = (id) => {
  return api
    .get("/fragmentoConSegmentos?id=".concat(id))
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};
