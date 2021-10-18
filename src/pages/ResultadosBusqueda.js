import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { Button, Card, CardBody, CardTitle, Col, Row } from "shards-react";
import { buscaFragmento } from "../api/busqueda";
import DetallesFragmento from "../pages/DetallesFragmento";
import {
  faArrowLeft,
  faSpinner,
  faBars,
  faArrowRight,
  faSearch,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ResultadosBusqueda = ({ consulta }) => {
  const [param, setParam] = useState({}); //contiene un objeto con todos los datos necesarios para la busqueda
  const [datosRecibidos, setDatosRecibidos] = useState(false);
  const [ejemplares, setEjemplares] = useState();
  const [idRegActual, setIdRegActual] = useState();
  const [idxAnterior, setIdxAnterior] = useState();
  const [idxActual, setIdxActual] = useState();
  const [idxSiguiente, setIdxSiguiente] = useState();
  /*
    recibo los datos de la vista de busqueda para despues realizar una peticion POST al backend
    */
  const getData = async (busqueda) => {
    try {
      console.log(busqueda);
      var respuesta = await buscaFragmento(busqueda);
      if (respuesta === 403) {
        console.log("error de acceso.");
      }
      console.log(respuesta);
      setEjemplares(respuesta);
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

  const procesaDescriptores = (listaDescriptor) => {
    return listaDescriptor.length === 0
      ? ""
      : "*".concat(listaDescriptor.toString(), "*");
  };

  const procesaTexto = (str) => {
    return str.length === 0 ? "" : "*".concat(str, "*");
  };

  useEffect(() => {
    var decodeConsulta = window.atob(consulta);
    console.log(consulta);
    setParam(JSON.parse(decodeConsulta));
    console.log(JSON.parse(decodeConsulta));
    if (datosRecibidos) {
      var strObjetosImplicitos = procesaDescriptores(param.objetosImplicitos);
      var strObjetosExplicitos = procesaDescriptores(
        param.objetosIdentificados
      );
      var busqueda = {
        tituloDelFragmento: procesaTexto(param.titulo),
        coleccion: procesaTexto(param.coleccion),
        realizador: procesaTexto(param.realizador),
        ubicacionGeografica: procesaTexto(param.ubicacion),
        descriptoresImplicitos: strObjetosImplicitos,
        descriptoresExplicitos: strObjetosExplicitos,
        observaciones: procesaTexto(param.observaciones),
        cualquierCampoDeTexto: procesaTexto(param.cualquierCampoDeTexto),

        codigoFechaOrEpoca: param.codigoFechaOrEpoca,
        strFechaRangoMin: param.strFechaRangoMin,
        strFechaRangoMax: param.strFechaRangoMax,
      };
      getData(busqueda);
    }
    setDatosRecibidos(true);
  }, [datosRecibidos]);

  const handleOnClickAnterior = () => {
    setIdxSiguiente(idxActual);
    setIdRegActual(ejemplares[idxAnterior].idReg);
    setIdxActual(idxAnterior);
    if (idxAnterior - 1 < 0) {
      setIdxAnterior(ejemplares.length - 1);
    } else {
      setIdxAnterior(idxAnterior - 1);
    }
  };

  const handleOnClickSiguiente = () => {
    setIdxAnterior(idxActual);
    setIdRegActual(ejemplares[idxSiguiente].idReg);
    setIdxActual(idxSiguiente);
    if (idxSiguiente + 1 === ejemplares.length) {
      setIdxSiguiente(0);
    } else {
      setIdxSiguiente(idxSiguiente + 1);
    }
  };

  const isElRegId = (ejemplar, idReg) => ejemplar.idReg === idReg;

  const accionFormatter = (cell, row, rowIndex, extraData) => {
    return (
      <Button
        squared
        theme="info"
        onClick={() => {
          var idxEnListaEjemplares = ejemplares.findIndex((ejemplar) => {
            return isElRegId(ejemplar, row.idReg);
          });
          console.log(idxEnListaEjemplares);
          setIdRegActual(row.idReg);
          setIdxActual(idxEnListaEjemplares);
          if (idxEnListaEjemplares - 1 < 0) {
            setIdxAnterior(ejemplares.length - 1);
          } else {
            setIdxAnterior(idxEnListaEjemplares - 1);
          }

          if (idxEnListaEjemplares + 1 == ejemplares.length) {
            setIdxSiguiente(0);
          } else {
            setIdxSiguiente(idxEnListaEjemplares + 1);
          }
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Detalles
      </Button>
    );
  };

  const columns = [
    {
      dataField: "idReg",
      text: "Registro",
    },
    {
      dataField: "tituloDelFragmento",
      text: "Título",
    },
    {
      dataField: "coleccion",
      text: "Colección",
    },
    {
      dataField: "realizador",
      text: "Realizador",
    },
    {
      dataField: "accion",
      text: "",
      formatter: accionFormatter,
    },
  ];
  //console.log(ejemplares);
  return (
    <div>
      <Card className="col mb-3">
        <CardBody>
          <CardTitle>
            <Row>
              <Col>
                Resultados de búsqueda
                {param.cualquierCampoDeTexto && (
                  <span>: {param.cualquierCampoDeTexto}</span>
                )}
              </Col>
              <Col md="2">
                <Button
                  theme="info"
                  className="float-right"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faArrowLeft} /> Regresar
                </Button>
              </Col>
            </Row>
          </CardTitle>
          <Row className="mb-3">
            <Col>
              {param.titulo && (
                <div>
                  <strong>Título:</strong> {param.titulo}.
                </div>
              )}
              {param.coleccion && (
                <div>
                  <strong>Colección: </strong>
                  {param.coleccion}.
                </div>
              )}
              {param.realizador && (
                <div>
                  <strong>Realizador: </strong>
                  {param.realizador}.
                </div>
              )}
              {param.ubicacion && (
                <div>
                  <strong>Ubicación: </strong>
                  {param.ubicacion}.
                </div>
              )}
              {param.codigoFechaOrEpoca === "F" && (
                <div>
                  <strong>Fecha: </strong>
                  {param.fecha.day}/{param.fecha.month}/{param.fecha.year}
                </div>
              )}
              {param.codigoFechaOrEpoca === "E" && (
                <div>
                  <strong>Época: </strong> Desde {param.epoca.monthStart}/
                  {param.epoca.yearStart} a {param.epoca.monthEnd}/
                  {param.epoca.yearEnd}
                </div>
              )}
            </Col>
            <Col>
              {param.observaciones && (
                <div>
                  <strong>Observaciones: </strong>
                  {param.observaciones}.
                </div>
              )}
            </Col>
          </Row>
          Número de registros encontrados: {ejemplares ? ejemplares.length : 0}
          {idRegActual && (
            <Row className="mt-3">
              <Button
                className="mr-auto"
                theme="dark"
                outline
                size="sm"
                onClick={handleOnClickAnterior}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Registro anterior
              </Button>
              <Button
                className="ml-auto"
                theme="dark"
                outline
                size="sm"
                onClick={handleOnClickSiguiente}
              >
                Registro siguiente <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Row>
          )}
        </CardBody>
      </Card>
      {!ejemplares && (
        <Row className="justify-content-center">
          <Col md="2" className="text-center">
            <FontAwesomeIcon icon={faSearch} spin />
            <span className="sr-only">Buscando coincidencias...</span>
          </Col>
        </Row>
      )}
      {ejemplares && !idRegActual && (
        <BootstrapTable
          bootstrap4
          bordered={false}
          hover={true}
          keyField="idReg"
          data={ejemplares}
          columns={columns}
          pagination={paginationFactory()}
          wrapperClasses="table-responsive"
          condensed
          noDataIndication="No existen coincidencias de tu búsqueda. :("
        />
      )}
      {idRegActual && (
        <div>
          <Row className="pl-3">
            <Button
              theme="success"
              className="mr-auto  mr-3"
              size="sm"
              onClick={() => {
                setIdRegActual();
                setIdxAnterior();
                setIdxActual();
                setIdxSiguiente();
              }}
            >
              <FontAwesomeIcon icon={faBars} /> Lista de resultados
            </Button>
          </Row>
          <DetallesFragmento fragmento={idRegActual} />
        </div>
      )}
    </div>
  );
};
export default ResultadosBusqueda;
