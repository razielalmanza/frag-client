import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Col,
  Row,
} from "shards-react";

export const FormPietaje = ({ setPietaje, pietaje }) => {
  const [pietajeInicio, setPietajeInicio] = useState(0);
  const [pietajeFin, setPietajeFin] = useState(0);

  const onChangeInicio = (e) => {
    var value = parseInt(e.target.value);
    var nwPietaje;
    setPietajeInicio(value);
    if (value < pietajeFin) {
      nwPietaje = {
        pietajeInicio: value,
        pietajeFin: pietajeFin,
        flagCompleto: true,
      };
    } else {
      nwPietaje = {
        pietajeInicio: value,
        pietajeFin: pietajeFin,
        flagCompleto: false,
      };
    }

    setPietaje(nwPietaje);
  };

  const onChangeFin = (e) => {
    var value = parseInt(e.target.value);
    var nwPietaje;
    setPietajeFin(value);
    if (value > pietajeInicio) {
      nwPietaje = {
        pietajeInicio: pietajeInicio,
        pietajeFin: value,
        flagCompleto: true,
      };
    } else {
      nwPietaje = {
        pietajeInicio: pietajeInicio,
        pietajeFin: value,
        flagCompleto: false,
      };
    }

    setPietaje(nwPietaje);
  };

  useEffect(() => {
    setPietajeInicio(pietaje.pietajeInicio);
    setPietajeFin(pietaje.pietajeFin);
  }, []);

  useEffect(() => {
    if (!pietaje.flagCompleto) {
      setPietajeInicio(pietaje.pietajeInicio);
      setPietajeFin(pietaje.pietajeFin);
    }
  }, [pietaje]);

  return (
    <Row>
      <Col>
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText className="text-dark">
              Pietaje inicio
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            type="number"
            onChange={onChangeInicio}
            value={pietajeInicio}
            min="0"
          />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText className="text-dark">Pietaje fin</InputGroupText>
          </InputGroupAddon>
          <FormInput
            type="number"
            onChange={onChangeFin}
            value={pietajeFin}
            min="0"
          />
        </InputGroup>
      </Col>
    </Row>
  );
};
export default FormPietaje;
