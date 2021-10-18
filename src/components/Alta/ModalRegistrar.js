import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { navigate } from "@reach/router";
import { Spinner } from "react-bootstrap";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { insertaFragmento } from "../../api/alta";
import CardRegistroFragmento from "../DetallesFragmento/CardRegistroFragmento";
import ItemListSegmentos from "../Alta/ItemListSegmentos";
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
      var respuesta = await insertaFragmento(fragmento);
      console.log(respuesta);
      console.log(fragmento);
      store.addNotification({
        message: "Fragmento agregado con éxito",
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
        className=" btn-block btn-warning rounded"
        disabled={!activaRegistrar}
        onClick={toggle}
      >
        <div className="row justify-content-md-center">
          <div className="col-1">
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
          <div className="col">Registrar fragmento con sus segmentos</div>
        </div>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="rounded" size="lg">
        <ModalHeader toggle={toggle}>
          ¿Quieres insertar el fragmento?
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
            <Spinner animation="border" variant="dark" />
          )}
        </ModalBody>
        {!openSpinner ? (
          <ModalFooter>
            <Button className="btn-warning " onClick={handleOnClickRegistrar}>
              Confirmar
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
