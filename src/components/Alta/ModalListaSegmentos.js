import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  Button,
  InputGroup,
  FormInput,
  Card,
  CardBody,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  FormTextarea,
} from "shards-react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ItemListSegmentos from "./ItemListSegmentos";
import FormPietaje from "../FormsSegmento/FormPietaje";
import FormTiempo from "../FormsSegmento/FormTiempo";
import VerificaSegmento from "../FormsSegmento/VerificaSegmento";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalListaSegmentos = ({ items, setSegmentos }) => {
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [segmentoAEditar, setSegmentoAEditar] = useState({});
  const [copiaSegmentoAEditar, setCopiaSegmentoAEditar] = useState({});
  const [idSegmentoAEditar, setIdSegmentoAEditar] = useState(0);
  const [listaSegmentos, setListaSegmentos] = useState(items);
  const [colocacion, setColocacion] = useState("");
  const [tipoSegmento, setTipoSegmento] = useState("");
  const [idSegmento, setIdSegmento] = useState();
  const [segmentoVerificado, setSegmentoVerificado] = useState(false);
  const [sinopsis, setSinopsis] = useState("");
  const [numRolloVol, setNumRolloVol] = useState("");
  const [hayListaColoc, setHayListaColoc] = useState(false);
  const [listaColocaciones, setListaColocaciones] = useState([]);
  const [pietaje, setPietaje] = useState({
    pietajeInicio: 0,
    pietajeFin: 0,
  });
  const [tiempo, setTiempo] = useState({
    horaInicio: 0,
    horaFin: 0,
    minutoInicio: 0,
    minutoFin: 0,
    segundoInicio: 0,
    segundoFin: 0,
  });
  //const [idRegBUDA, setIdRegBUDA] = useState("");
  //const [idCLAF, setIdCLAF] = useState("");

  useEffect(() => {
    if (!editar) {
      setSegmentoAEditar({});
      setIdSegmentoAEditar(0);
      setColocacion("");
      setNumRolloVol(0);
      setTiempo({
        horaInicio: 0,
        horaFin: 0,
        minutoInicio: 0,
        minutoFin: 0,
        segundoInicio: 0,
        segundoFin: 0,
      });
      setPietaje({
        pietajeInicio: 0,
        pietajeFin: 0,
      });
    }
  }, [editar]);

  useEffect(() => {
    setListaSegmentos(items);
  }, [items]);

  const toggle = () => {
    setModal(!modal);
    setHayListaColoc(false);
  };

  const _delete = (id) => {
    let temp = listaSegmentos.splice(id, 1);
    setListaSegmentos([...listaSegmentos]);
    setSegmentos([...listaSegmentos]);
  };

  const _setTiempo = (nwTiempo) => {
    setPietaje({
      pietajeInicio: 0,
      pietajeFin: 0,
    });
    var nw = segmentoAEditar;
    nw.codigoPiesOrTiempoOrMetros = "T";
    nw.segmentoInicio = "".concat(
      nwTiempo.horaInicio,
      ":",
      nwTiempo.minutoInicio,
      ":",
      nwTiempo.segundoInicio
    );
    nw.segmentoFin = "".concat(
      nwTiempo.horaFin,
      ":",
      nwTiempo.minutoFin,
      ":",
      nwTiempo.segundoFin
    );
    setSegmentoAEditar(nw);
    setTiempo(nwTiempo);
  };
  const _setPietaje = (nwPietaje) => {
    setTiempo({
      horaInicio: 0,
      horaFin: 0,
      minutoInicio: 0,
      minutoFin: 0,
      segundoInicio: 0,
      segundoFin: 0,
    });
    var nw = segmentoAEditar;
    nw.codigoPiesOrTiempoOrMetros = "P";
    nw.segmentoInicio = "";
    nw.segundoFin = "";
    setSegmentoAEditar(nw);
    setPietaje(nwPietaje);
  };

  const preparaEdicion = (item, id) => {
    setCopiaSegmentoAEditar(item);
    setIdSegmentoAEditar(id);
    setSegmentoAEditar(item);
    if (item.idRegAcervo != null) {
      setColocacion(item.colocacion);
      //setIdRegBUDA(item.idRegAcervo);
      setIdSegmento(item.idRegAcervo);
      setTipoSegmento("buda");
    } else {
      setIdSegmento(item.idreg_copias_titulos);
      setTipoSegmento("claf");
    }

    setSinopsis(item.sinopsis_segmento);
    setSegmentoVerificado(true);
    setNumRolloVol(item.numRolloOrVolumenDeInicioDelSegmento);
    if (item.codigoPiesOrTiempoOrMetros === "P") {
      var nw = pietaje;
      nw.pietajeInicio = parseInt(item.pietajeInicio);
      nw.pietajeFin = parseInt(item.pietajeFin);
      nw.flagCompleto = true;
      setPietaje(nw);
    } else if (item.codigoPiesOrTiempoOrMetros === "T") {
      nw = tiempo;
      nw.horaInicio = item.horaInicio;
      nw.horaFin = item.horaFin;
      nw.minutoInicio = item.minutoInicio;
      nw.minutoFin = item.minutoFin;
      nw.segundoInicio = item.segundoInicio;
      nw.segundoFin = item.segundoFin;
      nw.flagCompleto = false;
      setTiempo(nw);
    }
    setEditar(true);
  };

  const handleOnclickEditar = () => {
    var nw = segmentoAEditar;
    if (!tiempo.flagCompleto && !pietaje.flagCompleto) {
      store.addNotification({
        message: "Confirma pietaje o tiempo",
        type: "info",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } else if (!segmentoVerificado) {
      store.addNotification({
        message: "Verifica la existencia del segmento",
        type: "info",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } else {
      nw.idRegAcervo = tipoSegmento === "buda" ? idSegmento : null;
      nw.idreg_copias_titulos = tipoSegmento === "claf" ? idSegmento : null;
      nw.horaInicio = tiempo.horaInicio;
      nw.horaFin = tiempo.horaFin;
      nw.minutoInicio = tiempo.minutoInicio;
      nw.minutoFin = tiempo.minutoFin;
      nw.segundoInicio = tiempo.segundoInicio;
      nw.segundoFin = tiempo.segundoFin;
      nw.pietajeInicio = pietaje.pietajeInicio;
      nw.pietajeFin = pietaje.pietajeFin;
      nw.colocacion = colocacion;
      nw.numRolloOrVolumenDeInicioDelSegmento = numRolloVol;
      nw.sinopsis_segmento = sinopsis;
      console.log(nw);
      setSegmentoAEditar(nw);
      var listaTempSeg = listaSegmentos;
      listaTempSeg[idSegmentoAEditar] = nw;
      setSegmentos(listaTempSeg);
      setSegmentoAEditar({});
      setCopiaSegmentoAEditar({});
      setEditar(false);
    }
  };

  const handleOnclickCancelar = () => {
    setEditar(false);
    setSegmentoAEditar(copiaSegmentoAEditar);
    setCopiaSegmentoAEditar({});
    setIdSegmentoAEditar(0);
    setColocacion("");
    setNumRolloVol(0);
    setSinopsis("");
    setHayListaColoc(false);
    setListaColocaciones([]);
  };

  return (
    <div>
      <Button className="btn btn-block btn-dark rounded" onClick={toggle}>
        <div className="row ">
          <div className="col-1 float-right">
            <FontAwesomeIcon icon={faList} />
          </div>
          <div className="col ">Segmentos</div>
        </div>
      </Button>

      <Modal isOpen={modal} toggle={toggle} className="rounded" size="lg">
        <ModalHeader toggle={toggle}>
          <p className="h5">Segmentos agregados</p>
        </ModalHeader>
        <ModalBody>
          {!editar ? (
            <ItemListSegmentos
              items={items}
              _handleDelete={_delete}
              setEditar={preparaEdicion}
            />
          ) : (
            <div>
              <div className="row mb-2">
                <div className="col">
                  <VerificaSegmento
                    setAutorizaSegmento={setSegmentoVerificado}
                    setTipoSegmento={setTipoSegmento}
                    setIdSegmento={setIdSegmento}
                    setColocacion={setColocacion}
                    tipoSegmento={tipoSegmento}
                    claveCLAF={idSegmento}
                    claveBUDA={idSegmento}
                    colocBUDA={colocacion}
                  />
                </div>

                <div className="col">
                  <label className="text-center mb-2 mt-2">
                    No de rollo o volumen
                  </label>
                  <FormInput
                    className="col-8  rounded text-dark"
                    type="number"
                    value={numRolloVol}
                    placeholder="Numero de rollo o volumen"
                    onChange={(e) => {
                      setNumRolloVol(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <Row>
                <div className="col">
                  <Card>
                    <CardBody>
                      <label className="h4 text-center mb-2 mt-2">
                        Pietaje
                      </label>
                      <FormPietaje setPietaje={_setPietaje} pietaje={pietaje} />
                    </CardBody>
                  </Card>
                </div>
              </Row>
              <Row className="mt-2">
                <div className="col">
                  <Card>
                    <CardBody>
                      <label className="h4 text-center mb-2 mt-2">Tiempo</label>
                      <FormTiempo setTiempo={_setTiempo} tiempo={tiempo} />
                    </CardBody>
                  </Card>
                </div>
              </Row>
              <div className="text-center mt-3 h5">Sinopsis</div>
              <Row className="mt-2 mb-2">
                <Col>
                  <FormTextarea
                    placeholder="Ingresa aquí la descripcion"
                    onChange={(e) => {
                      setSinopsis(e.target.value);
                    }}
                    value={sinopsis}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center mt-2">
                <Button
                  onClick={handleOnclickCancelar}
                  theme="danger"
                  outline
                  className="col-2 mr-3"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleOnclickEditar}
                  theme="info"
                  className="col-2 ml-3"
                >
                  Listo
                </Button>
              </Row>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalListaSegmentos;
