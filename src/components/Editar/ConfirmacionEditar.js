import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { navigate } from "@reach/router";
import { Spinner } from "react-bootstrap";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { actualizaFragmento } from "../../api/editar";
import CardRegistroFragmento from "../DetallesFragmento/CardRegistroFragmento";
import ItemListSegmentos from "../Alta/ItemListSegmentos";
import { Row, Col } from "shards-react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ConfirmacionEditar = ({
  activaRegistrar,
  fragmento,
  segmentos,
}) => {
  const [modal, setModal] = useState(false);
  const [openSpinner, setOpenSpinner] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleOnClickRegistrar = async () => {
    try {
      setOpenSpinner(true);
      fragmento.alSegmentos = [...segmentos];

      var respuesta = await actualizaFragmento(fragmento);
      console.log(respuesta);
      store.addNotification({
        message: "Fragmento editado con éxito",
        type: "success",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
        },
      });

      setOpenSpinner(false);
      navigate("/");
    } catch (error) {
      setOpenSpinner(false);
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
      <Button
        className="  btn-block btn-warning rounded"
        disabled={!activaRegistrar}
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faPencilAlt} /> Actualizar fragmentos y sus
        segmentos
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="rounded" size="lg">
        <ModalHeader toggle={toggle}>
          ¿Quieres Realizar las modificaciones?
        </ModalHeader>
        <ModalBody>
          {!openSpinner ? (
            <div>
              <CardRegistroFragmento fragmento={fragmento} />
              <div className="row h4 pt-3 pb-3 justify-content-center">
                SEGMENTOS
              </div>
              <ItemListSegmentos items={segmentos} consulta={true} />
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col md="2">
                <Spinner animation="border" variant="dark" />
              </Col>
            </Row>
          )}
        </ModalBody>
        {!openSpinner ? (
          <ModalFooter>
            <Button className="btn-warning " onClick={handleOnClickRegistrar}>
              Editar
            </Button>
            <Button className="btn-secondary rounded" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter></ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default ConfirmacionEditar;
