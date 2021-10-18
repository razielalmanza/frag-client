import api from "./index";

export const insertaFragmento = (fragmento) => {
  return api
    .put("/insertaFragmento", fragmento)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
