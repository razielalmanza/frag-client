import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import { Button, Col, Row } from "shards-react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FechaOEpoca from "../CollapseTiempo/FechaOEpoca";
import Implicitos from "../Descriptores/SearchImplicitos";
import Identificados from "../Descriptores/SearchIdentificados";
import Observaciones from "../FormsFragmentos/Observaciones";
import GenericInput from "../FormsFragmentos/GenericInput";

export const FormAltaFragmento = ({
  dataFragmento,
  setFragmentoPadre,
  setHayFragmento,
}) => {
  const [fragmento, setFragmento] = useState(dataFragmento);

  const [objetosImplicitos, setObjetosImplicitos] = useState([]);
  const [objetosIdentificados, setObjetosIdentificados] = useState([]);
  const [epoca, setEpoca] = useState({
    fechaRangoMin: new Date(),
    fechaRangoMax: new Date(),
  });
  const [fecha, setFecha] = useState({
    fechaRangoMin: new Date(),
    fechaRangoMax: new Date(),
  });
  const [visibleAlertFyE, setVisibleAlertFyE] = useState(false);
  const [visibleDescriptor, setVisibleDescriptor] = useState(false);
  const [visible, setVisible] = useState(false);

  const _setFecha = (nwfecha) => {
    setHayFragmento(false);
    nwfecha.flagCompleto = true;
    setFecha(nwfecha);
    setEpoca({});
  };

  const _setEpoca = (nwEpoca) => {
    setHayFragmento(false);
    var nw = nwEpoca;
    if (nwEpoca.fechaRangoMin.valueOf() < nwEpoca.fechaRangoMax.valueOf()) {
      nw.flagCompleto = true;
    } else {
      nw.flagCompleto = false;
    }
    setEpoca(nw);
    setFecha({});
  };

  const setTitulo = (nwTitulo) => {
    var nw = fragmento;
    nw.tituloDelFragmento = nwTitulo;
    setFragmento(nw);
    setHayFragmento(false);
  };

  const setColeccion = (nwCole) => {
    var nw = fragmento;
    nw.coleccion = nwCole;
    setFragmento(nw);
    setHayFragmento(false);
  };

  const setRealizador = (nwReal) => {
    var nw = fragmento;
    nw.realizador = nwReal;
    setFragmento(nw);
    setHayFragmento(false);
  };

  const setUbicacion = (nwUbicacion) => {
    var nw = fragmento;
    nw.ubicacionGeografica = nwUbicacion;
    setFragmento(nw);
    setHayFragmento(false);
  };

  const setObservaciones = (nwObservaciones) => {
    var nw = fragmento;
    nw.observaciones = nwObservaciones;
    setFragmento(nw);
    setHayFragmento(false);
  };

  const _setImplicitos = (items) => {
    setHayFragmento(false);
    setObjetosImplicitos([...items]);
  };

  const _setIdentificados = (items) => {
    setHayFragmento(false);
    setObjetosIdentificados([...items]);
  };

  /**
   * Para edición, en lugar de "T" y "F" para el tiempo y fecha
   * se utilizan "epoca" y "fecha" ya que el servicio de back
   * asi lo solicita
   */
  const defineFechaOrEpoca = () => {
    if (epoca.flagCompleto) return "E";
    else if (fecha.flagCompleto) return "F";
    else return "";
  };

  const defineFechaRangoMin = () => {
    if (epoca.flagCompleto) {
      return epoca.fechaRangoMin.valueOf();
    } else if (fecha.flagCompleto) {
      return fecha.fechaRangoMin.valueOf();
    } else return 0;
  };

  const defineFechaRangoMax = () => {
    if (epoca.flagCompleto) {
      return epoca.fechaRangoMax.valueOf();
    } else if (fecha.flagCompleto) {
      return fecha.fechaRangoMax.valueOf();
    } else return 0;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    var nw = fragmento;
    console.log(nw);
    nw.codigoFechaOrEpoca = defineFechaOrEpoca();
    nw.strFechaRangoMin = defineFechaRangoMin();
    nw.strFechaRangoMax = defineFechaRangoMax();
    if (!fragmento.coleccion) nw.coleccion = "";
    if (!fragmento.observaciones) nw.observaciones = "";
    if (!fragmento.ubicacionGeografica) nw.ubicacionGeografica = "";
    if (!fragmento.realizador) nw.realizador = "";
    nw.descriptoresImplicitos = objetosImplicitos.toString();
    nw.descriptoresExplicitos = objetosIdentificados.toString();
    if (nw.tituloDelFragmento === "") {
      store.addNotification({
        message: "Necesitas un titulo del fragmento",
        type: "warning",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        insert: "bottom",
      });
    } else if (!epoca.flagCompleto && !fecha.flagCompleto) {
      store.addNotification({
        message: "Agrega fecha o época",
        type: "info",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        insert: "bottom",
      });
    } else if (
      objetosImplicitos.length === 0 &&
      objetosIdentificados.length === 0
    ) {
      store.addNotification({
        message: "Debes de tener al menos una etiqueta establecida",
        type: "info",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        insert: "bottom",
      });
    } else {
      setFragmentoPadre(nw);
    }
  };

  return (
    <div className="mb-3">
      <div className="d-flex flex-wrap  mt-3 mb-3">
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setTitulo}
            required={true}
            input={fragmento.tituloDelFragmento}
            label="Titulo de Fragmento"
          />
        </Col>
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setColeccion}
            required={false}
            input={fragmento.coleccion}
            label="Colección"
          />
        </Col>
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setRealizador}
            required={false}
            input={fragmento.realizador}
            label="Realizador"
          />
        </Col>

        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setUbicacion}
            required={false}
            input={fragmento.ubicacionGeografica}
            label="Lugar"
          />
        </Col>

        <Col md="6">
          <FechaOEpoca
            setEpoca={_setEpoca}
            setFecha={_setFecha}
            fechaMin={new Date()}
            fechaMax={new Date()}
            opcion="epoca"
          />
        </Col>
        <Col md="6">
          <Observaciones
            setObservaciones={setObservaciones}
            input={dataFragmento.observaciones}
          />
        </Col>
      </div>
      <Alert color="danger" isOpen={visibleDescriptor}>
        Al menos se necesita llenar un descriptor
      </Alert>
      <Row className="ml-1">
        <Implicitos
          updateImplicitos={_setImplicitos}
          data={objetosImplicitos}
        />

        <Identificados
          updateIdentificados={_setIdentificados}
          data={objetosIdentificados}
        />
      </Row>
      <Alert color="success" isOpen={visible}>
        Fragmento añadido.
      </Alert>
      <Alert color="danger" isOpen={visibleAlertFyE}>
        Solo llena Fecha o Época
      </Alert>
      <div className="row mt-2">
        <Button
          className=" col-4 offset-4"
          theme="primary"
          onClick={handleOnSubmit}
        >
          Agregar Fragmento
        </Button>
      </div>
    </div>
  );
};

export default FormAltaFragmento;
