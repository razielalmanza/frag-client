import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Col,
  Row,
} from "shards-react";

const FormTiempo = ({ setTiempo, tiempo }) => {
  const [horaInicio, setHoraIncio] = useState(0);
  const [horaFin, setHoraFin] = useState(0);
  const [minutoInicio, setMinutoInicio] = useState(0);
  const [minutoFin, setMinutoFin] = useState(0);
  const [segundoInicio, setSegundoInicio] = useState(0);
  const [segundoFin, setSegundoFin] = useState(0);
  const [datos, setDatos] = useState({
    horaInicio: 0,
    horaFin: 0,
    minutoInicio: 0,
    minutoFin: 0,
    segundoInicio: 0,
    segundoFin: 0,
  });

  useEffect(() => {
    setDatos(tiempo);
  }, []);

  useEffect(() => {
    if (!tiempo.flagCompleto) {
      setDatos(tiempo);
    }
  }, [tiempo]);

  const handleOnChange = (e) => {
    var nw = datos;

    var fechaInicio = new Date();
    var fechaFin = new Date();

    nw[e.target.name] = e.target.value;

    fechaInicio.setHours(nw.horaInicio);
    fechaInicio.setMinutes(nw.minutoInicio);
    fechaInicio.setSeconds(nw.segundoInicio);

    fechaFin.setHours(nw.horaFin);
    fechaFin.setMinutes(nw.minutoFin);
    fechaFin.setSeconds(nw.segundoFin);

    if (fechaFin.valueOf() > fechaInicio.valueOf()) {
      nw.flagCompleto = true;
      setTiempo(nw);
    } else {
      nw.flagCompleto = false;
      setTiempo(nw);
    }
  };

  return (
    <div>
      <strong>Inicio:</strong>
      <Row>
        <Col>
          <InputGroup className="mb-2">
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Hora</InputGroupText>
            </InputGroupAddon>
            <FormInput
              min={0}
              max={100}
              type="number"
              onChange={handleOnChange}
              value={tiempo.horaInicio}
              name="horaInicio"
            />
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Minuto</InputGroupText>
            </InputGroupAddon>
            <FormInput
              min={0}
              max={60}
              type="number"
              onChange={handleOnChange}
              value={tiempo.minutoInicio}
              name="minutoInicio"
            />
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Segundo</InputGroupText>
            </InputGroupAddon>

            <FormInput
              min={0}
              max={60}
              type="number"
              onChange={handleOnChange}
              value={tiempo.segundoInicio}
              name="segundoInicio"
            />
          </InputGroup>
        </Col>
      </Row>
      <strong>Fin:</strong>
      <Row>
        <Col>
          <InputGroup className="mb-2">
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Hora</InputGroupText>
            </InputGroupAddon>
            <FormInput
              min={0}
              max={100}
              type="number"
              onChange={handleOnChange}
              value={tiempo.horaFin}
              name="horaFin"
            />
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Minuto</InputGroupText>
            </InputGroupAddon>
            <FormInput
              min={0}
              max={60}
              type="number"
              onChange={handleOnChange}
              value={tiempo.minutoFin}
              name="minutoFin"
            />
            <InputGroupAddon type="prepend">
              <InputGroupText className="text-dark">Segundo</InputGroupText>
            </InputGroupAddon>

            <FormInput
              min={0}
              max={60}
              type="number"
              onChange={handleOnChange}
              value={tiempo.segundoFin}
              name="segundoFin"
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};
export default FormTiempo;
