import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "shards-react";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalCancelar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button theme="info" className="float-left" outline onClick={toggle}>
        {" "}
        <FontAwesomeIcon icon={faBan} /> Cancelar
      </Button>
      <Modal open={open} toggle={toggle}>
        <ModalBody className="text-center">
          ¿Seguro que quieres cancelar estos cambios?
        </ModalBody>
        <ModalFooter>
          <Button
            theme="info"
            outline
            onClick={() => {
              window.history.back();
            }}
          >
            Cancelar
          </Button>
          <Button onClick={toggle} outline>
            Seguir editando
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalCancelar;
