import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import {
  Button,
  Col,
  Row,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
} from "shards-react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import BuscadorTiempo from "../CollapseTiempo/BuscadorTiempo";
import Implicitos from "../Descriptores/SearchImplicitos";
import Identificados from "../Descriptores/SearchIdentificados";
import Observaciones from "../FormsFragmentos/Observaciones";
import GenericInput from "../FormsFragmentos/GenericInput";
import FechaOEpoca from "../CollapseTiempo/FechaOEpoca";
export const FormEditarFragmento = ({
  dataFragmento,
  setHayFragmento,
  setFragmentoPadre,
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

  useEffect(() => {
    if (dataFragmento.codigoFechaOrEpoca === "E") {
      setEpoca({
        fechaRangoMin: fragmento.strFechaRangoMin,
        fechaRangoMax: fragmento.strFechaRangoMax,
        flagCompleto: true,
      });
    } else {
      setFecha({
        fechaRangoMin: fragmento.strFechaRangoMin,
        fechaRangoMax: fragmento.strFechaRangoMax,
        flagCompleto: true,
      });
    }
    if (!Array.isArray(dataFragmento.descriptoresExplicitos)) {
      dataFragmento.descriptoresExplicitos !== ""
        ? setObjetosIdentificados([
            ...dataFragmento.descriptoresExplicitos.split(","),
          ])
        : setObjetosIdentificados([]);
    }
    if (!Array.isArray(dataFragmento.descriptoresImplicitos)) {
      dataFragmento.descriptoresImplicitos !== ""
        ? setObjetosImplicitos([
            ...dataFragmento.descriptoresImplicitos.split(","),
          ])
        : setObjetosImplicitos([]);
    }
  }, []);

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
    setObjetosImplicitos([...items]);
    setHayFragmento(false);
  };

  const _setIdentificados = (items) => {
    setObjetosIdentificados([...items]);
    setHayFragmento(false);
  };

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
    nw.codigoFechaOrEpoca = defineFechaOrEpoca();
    nw.strFechaRangoMin = defineFechaRangoMin();
    nw.strFechaRangoMax = defineFechaRangoMax();
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
        message: "Fecha o época incompleta",
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
      <Row className="justify-content-center mt-2">
        <Col md="6">
          <InputGroup className="mb-2">
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Colocación</InputGroupText>
            </InputGroupAddon>
            <FormInput disabled value={dataFragmento.colocacion} />
          </InputGroup>
        </Col>
      </Row>
      <div className="d-flex flex-wrap  mt-3 mb-3">
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setTitulo}
            required={true}
            input={fragmento.tituloDelFragmento}
            label={"Titulo de fragmento"}
          />
        </Col>
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setColeccion}
            required={false}
            input={fragmento.coleccion}
            label={"Colección"}
          />
        </Col>
        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setRealizador}
            required={false}
            input={fragmento.realizador}
            label={"Realizador"}
          />
        </Col>

        <Col md="6" className="mb-2">
          <GenericInput
            setInput={setUbicacion}
            required={false}
            input={fragmento.ubicacionGeografica}
            label={"Lugar"}
          />
        </Col>
        {/*<Col md="6" className="mb-2">
          <BuscadorTiempo
            setEpoca={_setEpoca}
            setFecha={_setFecha}
            dataFecha={fecha}
            dataEpoca={epoca}
            ventanaDefault={
              dataFragmento.codigoFechaOrEpoca === "E" ? "epoca" : "fecha"
            }
          />
        </Col>*/}
        <Col md="6">
          <FechaOEpoca
            setEpoca={_setEpoca}
            setFecha={_setFecha}
            fechaMin={fragmento.strFechaRangoMin}
            fechaMax={fragmento.strFechaRangoMax}
            opcion={
              dataFragmento.codigoFechaOrEpoca === "E" ? "epoca" : "fecha"
            }
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
      <Row>
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
          Actualizar Fragmento
        </Button>
      </div>
    </div>
  );
};

export default FormEditarFragmento;
