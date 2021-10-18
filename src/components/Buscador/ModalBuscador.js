import { Link } from "@reach/router";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "shards-react";

export const ModalBuscador = () => {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  //var FECHA_NO_HABIA_CINE = new Date(1800, 0, 1, 0, 0, 0, 0).valueOf();

  const toggle = () => {
    setModal(!modal);
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  var consulta = {
    cualquierCampoDeTexto: input,
    codigoFechaOrEpoca: "",
    titulo: "",
    coleccion: "",
    realizador: "",
    ubicacion: "",
    observaciones: "",
    objetosImplicitos: "", //procesaDescriptores( [...objetosImplicitos]),
    objetosIdentificados: "",
    epoca: "",
    fecha: "",
    fechaRangoMin: 0,
    fechaRangoMax: 0,
  };
  var path = "/resultados/";

  consulta = JSON.stringify(consulta);

  var consultaEncript = window.btoa(consulta);

  path = path.concat(consultaEncript);
  //console.log("uwdysiojpeeughrijof" + consulta);
  return (
    <div>
      <Button className="btn-warning btn-block " onClick={toggle}>
        No sé de donde proviene la información
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="rounded">
        <ModalHeader toggle={toggle}>
          <p className="h4">Buscador general</p>
        </ModalHeader>
        <ModalBody>
          <span className="text-dark">
            Se realizará una búsqueda general con la información que escribas a
            continuación:
          </span>

          <Form.Control
            className="col-12 rounded"
            placeholder="Buscar en todos los campos"
            onChange={handleOnChange}
          />
        </ModalBody>
        <ModalFooter>
          <Link to={path} className="text-white">
            <Button className="btn-success " disabled={input === ""}>
              Buscar
            </Button>
          </Link>

          <Button className="btn-secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalBuscador;
