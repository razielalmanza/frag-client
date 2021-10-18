import api from "./index";
import apiClaf from "./indexClaf";

export const actualizaFragmento = (nwFragmento) => {
  return api
    .patch("/actualizaFragmento", nwFragmento)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const colocacionesExistentesSegmentosAcervo = (colocacion) => {
  return api
    .get("/colocacionesExistentes?colocacion=".concat(colocacion))
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const verificacionClaf = (idCopiasTitulos) => {
  return apiClaf
    .post("/leeCopiaDeTituloPorSuId/".concat(idCopiasTitulos))
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};
