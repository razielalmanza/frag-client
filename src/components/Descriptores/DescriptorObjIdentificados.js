import React from "react";
import { Button, ListGroup, ListGroupItem } from "shards-react";
import "../../styles/Descriptor.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DescriptorObjIdentificados = ({ items, _handleDelete }) => {
  const elimina = (id) => {
    _handleDelete(id);
  };

  return (
    <ListGroup className="lista  mt-3">
      {items.map((item, id) => {
        return (
          <ListGroupItem key={id}>
            <div className="row ">
              <div className="col">{item}</div>

              <div className="col-2  ">
                <Button
                  theme="danger"
                  className="btn  btn-sm rounded"
                  onClick={() => {
                    elimina(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default DescriptorObjIdentificados;
