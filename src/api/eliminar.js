import api from "./index";

export const eliminaFragmento = (idReg) => {
  return api
    .delete("/eliminaFragmento?idReg=".concat(idReg))
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
