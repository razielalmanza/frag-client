import api from "./index";

export const buscaFragmento = (consulta) => {
  return api
    .post("/buscaFragmento", consulta)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const totalDeRegsitrosFragmentos = () => {
  return api
    .get("/count")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};
