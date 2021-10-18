import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormInput,
  InputGroup,
  FormCheckbox,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormTextarea,
  Row,
  Col,
  ModalFooter,
} from "shards-react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  colocacionesExistentesSegmentosAcervo,
  verificacionClaf,
} from "../../api/editar";

export const VerificaSegmento = ({
  setTipoSegmento,
  setAutorizaSegmento,
  setIdSegmento,
  setColocacion,
  tipoSegmento,
  claveCLAF,
  claveBUDA,
  colocBUDA,
}) => {
  const [idBUDA, setIdBUDA] = useState("");
  const [colocacionBUDA, setColocacionBUDA] = useState("");
  const [idCLAF, setIdCLAF] = useState("");
  const [segmentoVerificado, setSegmentoVerificado] = useState(false);
  const [opcionBuda, setOpcionBuda] = useState(false);
  const [opcionClaf, setOpcionClaf] = useState(true);
  const [listaEjemplares, setListaEjemplares] = useState([{}]);
  const [ejemplarClaf, setEjemplarClaf] = useState({});
  const [openSpinner, setOpenSpinner] = useState(false);
  const [modalBuda, setModalBuda] = useState(false);
  const [modalClaf, setModalClaf] = useState(false);
  const [tipoDeId, setTipoDeId] = useState("");
  const toggleBuda = () => {
    setModalBuda(!modalBuda);
  };

  const toggleClaf = () => {
    setModalClaf(!modalClaf);
  };

  useEffect(() => {
    setTipoDeId(tipoSegmento);
    if (tipoSegmento === "buda") {
      setColocacionBUDA(colocBUDA);
      setIdBUDA(claveBUDA);
      setSegmentoVerificado(true);
      setOpcionBuda(true);
      setOpcionClaf(false);
    } else if (tipoSegmento === "claf") {
      setIdCLAF(claveCLAF);
      setSegmentoVerificado(true);
      setOpcionBuda(false);
      setOpcionClaf(true);
    } else {
      setSegmentoVerificado(false);
      setTipoDeId("");
    }
  }, [tipoSegmento]);

  const handleOnChangeColocBUDA = (e) => {
    if (segmentoVerificado) {
      setSegmentoVerificado(false);
      setAutorizaSegmento(false);
      setTipoDeId("");
    }
    setColocacionBUDA(e.target.value);
    setIdCLAF("");
    setTipoSegmento("");
    setIdSegmento("");
  };

  const handleOnChangeIdCLAF = (e) => {
    if (segmentoVerificado) {
      setSegmentoVerificado(false);
      setAutorizaSegmento(false);
      setTipoDeId("");
    }
    setIdCLAF(e.target.value);
    setColocacionBUDA("");
    setTipoSegmento("");
    setIdSegmento("");
  };

  const handleVerificaAcervo = async (e) => {
    e.preventDefault();
    try {
      setOpenSpinner(true);
      var respuesta = await colocacionesExistentesSegmentosAcervo(
        colocacionBUDA
      );
      console.log(respuesta);
      setListaEjemplares(respuesta);
      if (respuesta.length === 0) {
        store.addNotification({
          message: "No existe registros con este ID, intenta de nuevo",
          type: "info",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      } else {
        toggleBuda();
      }
      setOpenSpinner(false);
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

  const handleVerificaClaf = async (e) => {
    e.preventDefault();
    try {
      setOpenSpinner(true);
      var respuesta = await verificacionClaf(idCLAF);
      console.log(respuesta);
      setEjemplarClaf(respuesta);
      if (respuesta.idreg_copias_titulos === 0) {
        store.addNotification({
          message: "No existe registros con este ID, intenta de nuevo",
          type: "info",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      } else {
        toggleClaf();
      }
      setOpenSpinner(false);
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
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="3">
          <FormCheckbox
            checked={opcionClaf}
            onChange={() => {
              setOpcionClaf(!opcionClaf);
              setOpcionBuda(opcionClaf);
            }}
          >
            CLAF
          </FormCheckbox>
        </Col>
        <Col md="3">
          {" "}
          <FormCheckbox
            checked={opcionBuda}
            onChange={() => {
              setOpcionBuda(!opcionBuda);
              setOpcionClaf(opcionBuda);
            }}
          >
            BUDA
          </FormCheckbox>
        </Col>
      </Row>
      <Row>
        <Col>
          {opcionBuda && (
            <Form onSubmit={handleVerificaAcervo}>
              <InputGroup>
                <FormInput
                  type="text"
                  placeholder="Colocacion BUDA"
                  value={colocacionBUDA}
                  onChange={handleOnChangeColocBUDA}
                  required
                  valid={tipoDeId === "buda"}
                />
                <Button theme="warning">Verificar en BUDA</Button>
              </InputGroup>
            </Form>
          )}

          {opcionClaf && (
            <Form onSubmit={handleVerificaClaf}>
              <InputGroup>
                <FormInput
                  type="text"
                  placeholder="ID ejemplar CLAF"
                  required
                  onChange={handleOnChangeIdCLAF}
                  value={idCLAF}
                  valid={tipoDeId === "claf"}
                />
                <Button theme="warning">Verificar en CLAF</Button>
              </InputGroup>
            </Form>
          )}
        </Col>
      </Row>
      {!segmentoVerificado ? (
        <Row>
          <Col>*Debes verificar la existencia del material.</Col>
        </Row>
      ) : (
        <Row>
          {tipoDeId === "buda" ? (
            <Col>
              <strong>Registro:</strong>
              {idBUDA}
            </Col>
          ) : (
            <Col>
              <strong>Segmento verificado en CLAF</strong>
            </Col>
          )}
        </Row>
      )}

      <Modal open={modalBuda} toggle={toggleBuda} size="lg">
        <ModalHeader toggle={toggleBuda}>
          Colocaciones. <small>Selecciona uno</small>
        </ModalHeader>

        <ModalBody
          style={{ "max-height": "calc(100vh - 210px)", "overflow-y": "auto" }}
        >
          <ListGroup>
            {listaEjemplares.map((item) => {
              return (
                <ListGroupItem
                  action
                  className="text-center"
                  onClick={(e) => {
                    setSegmentoVerificado(true);
                    setColocacionBUDA(item.colocacion);
                    setColocacion(item.colocacion);
                    setIdBUDA(item.idReg);
                    setTipoDeId("buda");
                    toggleBuda();
                    setTipoSegmento("buda");
                    setAutorizaSegmento(true);
                    setIdSegmento(item.idReg);
                  }}
                >
                  <p>
                    <strong>{item.tituloOriginal}</strong>{" "}
                    {item.anioDeProduccion && (
                      <small>({item.anioDeProduccion})</small>
                    )}
                  </p>
                  <div className="text-center">
                    <small>{item.realizador}</small>
                  </div>
                  <div>
                    <strong>Formato: </strong>
                    {item.formato}, <strong>Soporte: </strong>
                    {item.soporte}, <strong>Emulsión: </strong>
                    {item.emulsion}, <strong>Color: </strong>
                    {item.color}, <strong>Audio: </strong>
                    {item.audio}, <strong>Tamaño: </strong>
                    {item.tama}
                  </div>
                  <div>
                    <strong>Colocación: </strong>
                    {item.colocacion}.
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ModalBody>
      </Modal>

      <Modal open={modalClaf} size="lg" toggle={toggleClaf}>
        <ModalHeader toggle={toggleClaf}>Ejemplar encontrado</ModalHeader>
        <ModalBody className="text-center">
          <p>
            <strong>{ejemplarClaf.tituloOriginal}</strong>{" "}
            {ejemplarClaf.anio && <small>({ejemplarClaf.anio})</small>}
          </p>
          <div className="text-center">
            <small>{ejemplarClaf.realizador}</small>
          </div>
          <div>
            <strong>Formato: </strong>
            {ejemplarClaf.formato}, <strong>Soporte: </strong>
            {ejemplarClaf.soporte}, <strong>Emulsión: </strong>
            {ejemplarClaf.emulsion}, <strong>Color: </strong>
            {ejemplarClaf.color}, <strong>Audio: </strong>
            {ejemplarClaf.audio}, <strong>Idioma: </strong>
            {ejemplarClaf.idioma}
          </div>
          <div className="mt-3">
            <strong>ID ejemplar CLAF: </strong>
            {ejemplarClaf.idreg_copias_titulos},
            <strong> Folio ingreso - Folio parcial ingreso:</strong>{" "}
            {ejemplarClaf.id_folio_ingreso}-{ejemplarClaf.id_ingreso_parcial}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button theme="light" onClick={toggleClaf}>
            {" "}
            Cancelar
          </Button>
          <Button
            theme="success"
            onClick={() => {
              toggleClaf();
              setSegmentoVerificado(true);
              setTipoDeId("claf");
              setTipoSegmento("claf");
              setAutorizaSegmento(true);
              setIdSegmento(ejemplarClaf.idreg_copias_titulos);
              setColocacion("");
            }}
          >
            {" "}
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerificaSegmento;
