import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Button, Col, Row } from "shards-react";
import { fragmentoConSegmentos } from "../api/detallesFragmento";
import CardRegistroFragmento from "../components/DetallesFragmento/CardRegistroFragmento";
import ItemListDescriptores from "../components/DetallesFragmento/ItemListDescriptores";
import CardListSegmentos from "../components/DetallesSegmento/CardListSegmentos";
import ModalEliminar from "../components/DetallesFragmento/ModalEliminar";
import "../styles/Descriptor.css";
import { redirect } from "../components/utils/Redirect";

import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DetallesFragmento = ({ fragmento }) => {
  // const [IdFragmento, setIdFragmento] = useState({});
  const [segmentos, setSegmentos] = useState({});
  const [fragmentoRecibido, setFragmentoRecibido] = useState(false);

  const getData = async function () {
    //    var respuestaFragmento = await fragmentoConSegmentos(fragmento);
    var respuestaSegmentos = await fragmentoConSegmentos(fragmento);
    if (respuestaSegmentos === 403) {
      console.log("error de acceso.");
      redirect();
    }
    //setIdFragmento(respuestaFragmento);
    setSegmentos(respuestaSegmentos);
    //console.log(respuestaFragmento);
    //console.log(respuestaSegmentos);
  };
  useEffect(() => {
    getData();
    setFragmentoRecibido(true);
  }, [fragmento]);

  var path = "/editar/";
  path = path.concat(fragmento);

  if (segmentos) {
    return (
      <div className="mt-3">
        <Row className="justify-content-center mb-3">
          <Col md="2" className="mr-auto">
            <Link to={path} className="text-white">
              <Button theme="info" outline>
                <FontAwesomeIcon icon={faPencilAlt} /> Editar
              </Button>
            </Link>
          </Col>
          <Col className="h3 text-center">DETALLES</Col>
          <Col md="2" className="ml-auto">
            <Row>
              <Col className="text-right">
                <ModalEliminar id={segmentos.idReg} />
              </Col>
            </Row>
          </Col>
        </Row>

        <CardRegistroFragmento fragmento={segmentos} />

        <p className="pl-2 ">
          <strong>Personajes, objetos y acciones identificados:</strong>
        </p>
        <Row>
          <Col>
            <ItemListDescriptores
              items={
                segmentos.descriptoresExplicitos
                  ? segmentos.descriptoresExplicitos.split(",")
                  : ["No hay datos."]
              }
            />
          </Col>
        </Row>
        <p className="pl-2 ">
          <strong> Objetos y acciones implícitos:</strong>
        </p>
        <Row>
          <Col>
            <ItemListDescriptores
              items={
                segmentos.descriptoresImplicitos
                  ? segmentos.descriptoresImplicitos.split(",")
                  : ["No hay datos."]
              }
            />
          </Col>
        </Row>
        <div className="row pt-2 bg-warning">
          <div className="col h3 text-center">
            {!segmentos.alSegmentos || segmentos.alSegmentos.length === 0
              ? "NO HAY SEGMENTOS"
              : "SEGMENTOS"}{" "}
          </div>
        </div>

        <div className="pt-3 mb-3">
          {segmentos.alSegmentos ? (
            <CardListSegmentos segmentos={segmentos.alSegmentos} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    return (
      <Row className="justify-content-center">
        <Col md="3">
          <Spinner animation="grow" /> Cargando información ...
        </Col>
      </Row>
    );
  }
};

export default DetallesFragmento;
