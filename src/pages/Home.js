import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Form,
} from "shards-react";
import { navigate } from "@reach/router";
import CardToAlta from "../components/Home/CardToAlta";
import CardToBuscar from "../components/Home/CardToBuscar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { totalDeRegsitrosFragmentos } from "../api/busqueda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export const Home = () => {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState();
  const [consulta, setConsulta] = useState({
    cualquierCampoDeTexto: "",
    codigoFechaOrEpoca: "",
    titulo: "",
    coleccion: "",
    realizador: "",
    ubicacion: "",
    observaciones: "",
    objetosImplicitos: "", //procesaDescriptores( [...objetosImplicitos]),
    objetosIdentificados: "",
    epoca: "",
    fecha: "",
    fechaRangoMin: 0,
    fechaRangoMax: 0,
  });

  const getTotalRegistros = async () => {
    try {
      var respuesta = await totalDeRegsitrosFragmentos();

      setTotal(respuesta);
    } catch (error) {
      store.addNotification({
        title: "Error",
        message: "Intentalo más tarde",
        type: "danger",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setConsulta({
      cualquierCampoDeTexto: input,
      codigoFechaOrEpoca: "",
      titulo: "",
      coleccion: "",
      realizador: "",
      ubicacion: "",
      observaciones: "",
      objetosImplicitos: "",
      objetosIdentificados: "",
      epoca: "",
      fecha: "",
      fechaRangoMin: 0,
      fechaRangoMax: 0,
    });
  }, [input]);

  useEffect(() => {
    getTotalRegistros();
  }, []);
  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleOnSubmit = (path) => {
    navigate(path);
  };

  var path = "/resultados/";

  var nwConsulta = JSON.stringify(consulta);

  var consultaEncript = window.btoa(nwConsulta);

  path = path.concat(consultaEncript);

  return (
    <div>
      <div className="text-center mt-5 ">
        {" "}
        <h2>FRAGMENTOS</h2>{" "}
      </div>

      <Row className="justify-content-center ">
        <Col md="6">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit(path);
            }}
          >
            <InputGroup className="mb-2">
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput
                placeholder="Buscar en todos los campos"
                onChange={handleOnChangeInput}
                required
              />
              <InputGroupAddon type="append">
                <Button theme="success">Buscar</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="4" className="mt-3 h5 text-center">
          <strong>Numero total de registros: {total}</strong>
        </Col>
      </Row>
      <div className="d-flex flex-wrap mt-1 justify-content-center">
        <Col md="4" className=" mt-5">
          <CardToBuscar />
        </Col>
        <Col md="4" className=" mt-5">
          <CardToAlta />
        </Col>
      </div>
    </div>
  );
};

export default Home;
