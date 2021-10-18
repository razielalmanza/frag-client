import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "shards-react";
import { eliminaFragmento } from "../../api/eliminar";
import { store } from "react-notifications-component";
import { navigate } from "@reach/router";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalEliminar = ({ id }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const borrarFragmento = async () => {
    try {
      await eliminaFragmento(id);
      toggle();
      store.addNotification({
        message: "Fragmento eliminado con éxito",
        type: "success",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        insert: "bottom",
      });
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
    }
    navigate("/");
  };
  return (
    <div>
      <Button theme="danger" onClick={toggle} outline>
        <FontAwesomeIcon icon={faTrash} title="Eliminar" /> Eliminar
      </Button>
      <Modal open={open} toggle={toggle}>
        <ModalBody className="text-center btn btn-danger">
          ¿Seguro que quieres borrar este fragmento con sus segmentos?
        </ModalBody>
        <ModalFooter>
          <Button
            theme="info"
            outline
            onClick={() => {
              borrarFragmento();
            }}
          >
            Borrar fragmento
          </Button>
          <Button onClick={toggle} outline>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalEliminar;
