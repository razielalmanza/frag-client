import { navigate } from "@reach/router";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "shards-react";
import FechaOEpoca from "../components/CollapseTiempo/FechaOEpoca";
import SearchIdentificados from "../components/Descriptores/SearchIdentificados";
import SearchImplicitos from "../components/Descriptores/SearchImplicitos";
import Observaciones from "../components/FormsFragmentos/Observaciones";
import GenericInput from "../components/FormsFragmentos/GenericInput";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Buscador = () => {
  const [fragmento, setFragmento] = useState("");
  const [coleccion, setColeccion] = useState("");
  const [realizador, setRealizador] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
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

  const _setTitulo = (nwTitulo) => {
    setFragmento(nwTitulo);
  };

  const _setColeccion = (nwCole) => {
    setColeccion(nwCole);
  };

  const _setRealizador = (nwReal) => {
    setRealizador(nwReal);
  };

  const _setUbicacion = (nwUbicacion) => {
    setUbicacion(nwUbicacion);
  };

  const _setObservaciones = (nwObservacion) => {
    setObservaciones(nwObservacion);
  };

  const _setImplicitos = (items) => {
    console.log([...items]);
    setObjetosImplicitos([...items]);
  };

  const _setFecha = (nwfecha) => {
    nwfecha.flagCompleto = true;
    setFecha(nwfecha);
    setEpoca({});
  };

  const _setEpoca = (nwEpoca) => {
    var nw = nwEpoca;
    if (nwEpoca.fechaRangoMin.valueOf() < nwEpoca.fechaRangoMax.valueOf()) {
      nw.flagCompleto = true;
    } else {
      nw.flagCompleto = false;
    }
    setEpoca(nw);
    setFecha({});
  };
  /*
  const _setEpoca = nwEpoca => {
    setEpoca(nwEpoca);
    setFecha({
      day: 0,
      month: "",
      year: 0
    });
  };

  const _setFecha = nwFecha => {
    setFecha(nwFecha);
    setEpoca({
      yearStart: 0,
      yearEnd: 0,
      monthStart: "",
      monthEnd: ""
    });
  };*/

  const _setIdentificados = (items) => {
    setObjetosIdentificados(items);
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

  const handleOnSubmit = (path) => {
    navigate(path);
  };

  const hayEpoca = epoca.yearStart > 0 && epoca.yearEnd > 0;

  var hayFecha = fecha.day > 0 || fecha.month !== "" || fecha.year > 0;

  var hayAlMenosUnCampo =
    fragmento !== "" ||
    coleccion !== "" ||
    realizador !== "" ||
    ubicacion !== "" ||
    observaciones !== "" ||
    objetosIdentificados.length > 0 ||
    objetosImplicitos.length > 0 ||
    hayEpoca ||
    hayFecha;

  var consulta = {
    titulo: fragmento,
    coleccion: coleccion,
    realizador: realizador,
    ubicacion: ubicacion,
    observaciones: observaciones,
    objetosImplicitos: objetosImplicitos, //procesaDescriptores( [...objetosImplicitos]),
    objetosIdentificados: objetosIdentificados,
    epoca: epoca,
    fecha: fecha,
    cualquierCampoDeTexto: "",
    codigoFechaOrEpoca: defineFechaOrEpoca(),
    strFechaRangoMin: defineFechaRangoMin(),
    strFechaRangoMax: defineFechaRangoMax(),
  };
  console.log(consulta);
  var path = "/resultados/";

  consulta = JSON.stringify(consulta);

  var consultaEncript = window.btoa(consulta);

  path = path.concat(consultaEncript);

  return (
    <div>
      <div className="h3 p-3 text-center"> BÚSQUEDA DE FRAGMENTO</div>
      <Form
        className="mb-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit(path);
        }}
      >
        <div className="d-flex flex-wrap ">
          <Col md="6" className="mb-2">
            <GenericInput
              setInput={_setTitulo}
              required={false}
              input={fragmento}
              label="Titulo de Fragmento"
            />
          </Col>
          <Col md="6" className="mb-2">
            <GenericInput
              setInput={_setColeccion}
              input={coleccion}
              label="Colección"
            />
          </Col>
          <Col md="6" className="mb-2">
            <GenericInput
              setInput={_setRealizador}
              input={realizador}
              label="Realizador"
            />
          </Col>
          <Col md="6" className="mb-2">
            <GenericInput
              setInput={_setUbicacion}
              input={ubicacion}
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
              setObservaciones={_setObservaciones}
              input={observaciones}
            />
          </Col>
        </div>
        <Row>
          <SearchImplicitos
            updateImplicitos={_setImplicitos}
            data={objetosImplicitos}
          />
          <SearchIdentificados
            updateIdentificados={_setIdentificados}
            data={objetosIdentificados}
          />
        </Row>
        <Row className="justify-content-center mt-3 mb-3">
          <div className="col-2">
            <Button
              theme="success"
              className="btn btn-block "
              disabled={!hayAlMenosUnCampo}
            >
              <FontAwesomeIcon icon={faSearch} /> Buscar
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};
export default Buscador;
