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

export const BuscadorTiempo = ({
  setEpoca,
  setFecha,
  dataFecha,
  dataEpoca,
  ventanaDefault,
}) => {
  const [esEpoca, setEsEpoca] = useState(false);
  const [esFecha, setEsFecha] = useState(false);

  const [epocaInicio, setEpocaInicio] = useState();
  const [epocaFin, setEpocaFin] = useState();
  const [nwFecha, setNwFecha] = useState();
  const [strEpocaInicio, setStrEpocaInicio] = useState("");
  const [strEpocaFin, setStrEpocaFin] = useState("");
  const [strFecha, setStrFecha] = useState("");
  /*const _setEpoca = nwEpoca => {
    setEpoca(nwEpoca);
  };

  const setNwFecha = nwFecha => {
    setFecha(nwFecha);
  };*/

  const handleEpocaIncio = (e) => {
    var nwDate = new Date("".concat(e.target.value, "T23:30:00-0600")); //Zona horario de CDMX
    var mes = (nwDate.getMonth() + 1).toString();
    if (mes.length === 1) mes = "0" + mes;
    var anio = nwDate.getFullYear().toString();
    setEpocaInicio({
      monthStart: nwDate.getMonth() + 1,
      yearStart: anio,
    });
    setStrEpocaInicio(anio + "-" + mes);

    var inicioEpoca = new Date(anio + "-" + mes);
    var finEpoca = new Date(strEpocaFin);
    if (inicioEpoca.valueOf() < finEpoca.valueOf()) {
      setEpoca({
        monthStart: nwDate.getMonth() + 1,
        yearStart: anio,
        ...epocaFin,
        flagCompleto: true,
      });
    } else {
      setEpoca({
        monthStart: nwDate.getMonth() + 1,
        yearStart: anio,
        ...epocaFin,
        flagCompleto: false,
      });
    }
  };

  const handleEpocaFin = (e) => {
    var nwDate = new Date("".concat(e.target.value, "T23:30:00-0600")); //Zona horario de CDMX
    var mes = (nwDate.getMonth() + 1).toString();
    if (mes.length === 1) mes = "0" + mes;
    var anio = nwDate.getFullYear().toString();

    setEpocaFin({
      monthEnd: nwDate.getMonth() + 1,
      yearEnd: anio,
    });
    setStrEpocaFin(anio + "-" + mes);

    var inicioEpoca = new Date(strEpocaInicio);
    var finEpoca = new Date(anio + "-" + mes);
    if (inicioEpoca.valueOf() < finEpoca.valueOf()) {
      setEpoca({
        ...epocaInicio,
        monthEnd: nwDate.getMonth() + 1,
        yearEnd: anio,
        flagCompleto: true,
      });
    } else {
      setEpoca({
        ...epocaInicio,
        monthEnd: nwDate.getMonth() + 1,
        yearEnd: anio,
        flagCompleto: false,
      });
    }
  };

  const handleFecha = (e) => {
    var nwDate = new Date("".concat(e.target.value, "T23:30:00-0600")); //Zona horario de CDMX
    var dia = nwDate.getDate().toString();
    var mes = (nwDate.getMonth() + 1).toString();
    var anio = nwDate.getFullYear().toString();

    console.log(dia);

    setNwFecha({
      day: nwDate.getDate(),
      month: nwDate.getMonth() + 1,
      year: anio,
    });

    if (mes.length === 1) mes = "0" + mes;
    if (dia.length === 1) dia = "0" + dia;

    setStrFecha(anio + "-" + mes + "-" + dia);

    if (nwDate.valueOf() > 0) {
      setFecha({
        day: nwDate.getDate(),
        month: nwDate.getMonth() + 1,
        year: anio,
        flagCompleto: true,
      });
    } else {
      setFecha({
        day: nwDate.getDate(),
        month: nwDate.getMonth() + 1,
        year: anio,
        flagCompleto: false,
      });
    }
  };

  useEffect(() => {
    if (esEpoca) {
      setEpocaInicio({
        monthStart: parseInt(dataEpoca.monthStart),
        yearStart: dataEpoca.yearStart,
      });

      var mesIncio =
        parseInt(dataEpoca.monthStart) < 10
          ? "0" + dataEpoca.monthStart.toString()
          : dataEpoca.monthStart;

      setStrEpocaInicio(dataEpoca.yearStart + "-" + mesIncio);

      setEpocaFin({
        monthEnd: parseInt(dataEpoca.monthEnd),
        yearEnd: dataEpoca.yearEnd,
      });

      var mesFin =
        parseInt(dataEpoca.monthEnd) < 10
          ? "0" + dataEpoca.monthEnd.toString()
          : dataEpoca.monthEnd;

      setStrEpocaFin(dataEpoca.yearEnd + "-" + mesFin);

      var inicioEpoca = new Date(dataEpoca.yearStart + "-" + mesIncio);
      var finEpoca = new Date(dataEpoca.yearEnd + "-" + mesFin);
      if (inicioEpoca.valueOf() < finEpoca.valueOf()) {
        setEpoca({
          ...dataEpoca,
          flagCompleto: true,
        });
      } else {
        setEpoca({
          ...dataEpoca,
          flagCompleto: false,
        });
      }
    } else if (esFecha) {
      setNwFecha({
        day: dataFecha.day,
        month: dataFecha.month,
        year: dataFecha.year,
      });

      var mes =
        parseInt(dataFecha.month) < 10
          ? "0" + dataFecha.month.toString()
          : dataFecha.month;

      var dia =
        parseInt(dataFecha.day) < 10
          ? "0" + dataFecha.day.toString()
          : dataFecha.day;

      setStrFecha(dataFecha.year + "-" + mes + "-" + dia);

      var nwFecha = new Date(dataFecha.year + "-" + mes + "-" + dia);
      if (nwFecha.valueOf() > 0) {
        setFecha({ ...dataFecha, flagCompleto: true });
      } else {
        setFecha({ ...dataFecha, flagCompleto: false });
      }
    }
  }, [esFecha, esEpoca]);

  useEffect(() => {
    if (ventanaDefault === "epoca") {
      setEsEpoca(true);
    } else {
      setEsFecha(true);
    }
  }, []);
  //Por terminar
  ///*
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
              onChange={handleEpocaIncio}
              value={strEpocaInicio}
            />

            <InputGroupAddon type="append">
              <InputGroupText>a</InputGroupText>
            </InputGroupAddon>
            <FormInput
              type="month"
              min="1800-01"
              max="9999-12"
              onChange={handleEpocaFin}
              value={strEpocaFin}
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
            <FormInput type="date" onChange={handleFecha} value={strFecha} />{" "}
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
  //*/
};

export default BuscadorTiempo;
