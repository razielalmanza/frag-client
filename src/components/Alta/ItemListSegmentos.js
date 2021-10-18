import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "shards-react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ItemListSegmentos = ({
  items,
  _handleDelete,
  setEditar,
  consulta,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState();
  const toggle = () => {
    setOpenModal(!openModal);
  };
  const handleDelete = (id) => {
    _handleDelete(id);
  };

  return (
    <div>
      <div className="row bg-success pr-3 bg-light">
        <div className="col-2  text-center">
          <strong>Id</strong>
        </div>
        <div className="col-2 ">
          <strong>Colocacion</strong>
        </div>
        <div className="col ">
          <strong>Rollo o Vol.</strong>
        </div>
        <div className="col ">
          <strong> Pietaje Inicio</strong>
        </div>
        <div className="col ">
          <strong>Pietaje Final</strong>
        </div>
        <div className="col-2 ">
          <strong>Tiempo</strong> (H:M:S)
        </div>
        <div className="col"> </div>
        <div className="col"> </div>
      </div>

      <ul className="list-group">
        {items.map((item, id) => {
          return (
            <li className="list-group-item" key={id}>
              <div className="row ">
                <div className="col-2 text-center ">
                  {item.idreg_copias_titulos > 0 ? (
                    <div>
                      <strong>
                        CLAF:
                        <br />
                      </strong>{" "}
                      {item.idreg_copias_titulos}{" "}
                    </div>
                  ) : (
                    <div>
                      <strong>
                        BUDA:
                        <br />
                      </strong>{" "}
                      {item.idRegAcervo}{" "}
                    </div>
                  )}
                </div>
                <div className="col-2 text-center  ">
                  {item.colocacion ? item.colocacion : "--"}
                </div>
                <div className="col text-center ">
                  {item.numRolloOrVolumenDeInicioDelSegmento}
                </div>
                <div className="col text-center ">
                  {item.codigoPiesOrTiempoOrMetros === "P"
                    ? item.pietajeInicio
                    : "--"}
                </div>
                <div className="col text-center ">
                  {item.codigoPiesOrTiempoOrMetros === "P"
                    ? item.pietajeFin
                    : "--"}
                </div>
                <div className="col-2 text-center ">
                  {item.codigoPiesOrTiempoOrMetros === "T" ? (
                    <div>
                      De {item.horaInicio}:{item.minutoInicio}:
                      {item.segundoInicio} a {item.horaFin}:{item.minutoFin}:
                      {item.segundoFin}
                    </div>
                  ) : (
                    "--"
                  )}
                </div>
                <div className="col text-center">
                  {!consulta ? (
                    <Button
                      theme="info"
                      size="sm"
                      onClick={() => {
                        setEditar(item, id);
                      }}
                    >
                      Editar
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="col ">
                  {!consulta && (
                    <Button
                      theme="danger"
                      size="sm"
                      outline
                      onClick={(e) => {
                        e.preventDefault();
                        //handleDelete(id);
                        setIdAEliminar(id);
                        toggle();
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal open={openModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>¿Eliminar?</ModalHeader>
        <ModalFooter>
          <Button
            theme="light"
            onClick={() => {
              setIdAEliminar();
              toggle();
            }}
          >
            {" "}
            Cancelar
          </Button>
          <Button
            theme="danger"
            onClick={() => {
              handleDelete(idAEliminar);
              toggle();
            }}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ItemListSegmentos;
