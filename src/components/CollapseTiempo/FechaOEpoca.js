import React, { useState, useEffect } from "react";
import {
  FormInput,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormCheckbox,
  Row,
  Col,
} from "shards-react";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FechaOEpoca = ({
  fechaMin,
  fechaMax,
  setFecha,
  setEpoca,
  opcion,
}) => {
  const [esEpoca, setEsEpoca] = useState(false);
  const [esFecha, setEsFecha] = useState(false);

  const [strEpocaInicio, setStrEpocaInicio] = useState("");
  const [strEpocaFin, setStrEpocaFin] = useState("");
  const [strFecha, setStrFecha] = useState("");

  useEffect(() => {
    if (opcion === "epoca") {
      setEsEpoca(true);
      var mesInicio =
        fechaMin.getMonth() + 1 < 10
          ? "".concat("0", fechaMin.getMonth() + 1)
          : fechaMin.getMonth() + 1;
      var mesFin =
        fechaMax.getMonth() + 1 < 10
          ? "".concat("0", fechaMax.getMonth() + 1)
          : fechaMax.getMonth() + 1;
      setStrEpocaInicio("".concat(fechaMin.getFullYear(), "-", mesInicio));
      setStrEpocaFin("".concat(fechaMax.getFullYear(), "-", mesFin));
    } else {
      setEsFecha(true);
      var mes =
        fechaMin.getMonth() + 1 < 10
          ? "".concat("0", fechaMin.getMonth() + 1)
          : fechaMin.getMonth() + 1;
      var dia =
        fechaMin.getDate() < 10
          ? "".concat("0", fechaMin.getDate())
          : fechaMin.getDate();
      setStrFecha("".concat(fechaMin.getFullYear(), "-", mes, "-", dia));
    }
  }, []);

  const handleEpocaIncio = (e) => {
    setStrEpocaInicio(e.target.value);
    var nwDate = new Date(e.target.value + "T23:30:00-0600");
    setEpoca({
      fechaRangoMin: nwDate,
      fechaRangoMax: new Date(strEpocaFin + "T23:30:00-0600"),
    });
    setStrFecha("");
  };

  const handleEpocaFin = (e) => {
    setStrEpocaFin(e.target.value);
    var nwDate = new Date(e.target.value + "T23:30:00-0600");
    setEpoca({
      fechaRangoMin: new Date(strEpocaInicio + "T23:30:00-0600"),
      fechaRangoMax: nwDate,
    });
    setStrFecha("");
  };

  const handleFecha = (e) => {
    console.log(e.target.value);
    setStrFecha(e.target.value);
    var nwDate = new Date(e.target.value + "T23:30:00-0600");
    setFecha({
      fechaRangoMin: nwDate,
      fechaRangoMax: nwDate,
    });
    setStrEpocaInicio("");
    setStrEpocaFin("");
  };

  return (
    <div>
      <Row className="justify-content-around">
        <Col md="4">
          <FormCheckbox
            inline
            onChange={() => {
              setEsEpoca(!esEpoca);

              setEsFecha(esEpoca);
            }}
            checked={esEpoca}
          >
            {" "}
            Época
          </FormCheckbox>
        </Col>
        <Col md="4">
          <FormCheckbox
            inline
            onChange={() => {
              setEsFecha(!esFecha);
              setEsEpoca(esFecha);
            }}
            checked={esFecha}
          >
            Fecha
          </FormCheckbox>
        </Col>
      </Row>
      {esEpoca && (
        <div>
          <InputGroup className="mb-2">
            <InputGroupAddon type="prepend">
              <InputGroupText>De</InputGroupText>
            </InputGroupAddon>
            <FormInput
              type="month"
              min="1800-01"
              max="9999-12"
              value={strEpocaInicio}
              onChange={handleEpocaIncio}
            />

            <InputGroupAddon type="append">
              <InputGroupText>a</InputGroupText>
            </InputGroupAddon>
            <FormInput
              type="month"
              min="1800-01"
              max="9999-12"
              value={strEpocaFin}
              onChange={handleEpocaFin}
            />
            <InputGroupAddon type="append">
              <InputGroupText>
                <FontAwesomeIcon icon={faCalendar} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}

      {esFecha && (
        <div>
          <InputGroup className="mb-2">
            <FormInput type="date" value={strFecha} onChange={handleFecha} />{" "}
            <InputGroupAddon type="append">
              <InputGroupText>
                <FontAwesomeIcon icon={faCalendar} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}
    </div>
  );
};

export default FechaOEpoca;
