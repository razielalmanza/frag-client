import React from "react";
import { Card, CardBody, Row, Col } from "shards-react";
export const CardRegistroFragmento = ({ fragmento }) => {
  return fragmento.tituloDelFragmento ? (
    <Card className="col mb-3">
      <CardBody>
        <Row className="mb-3">
          <Col>
            <div>
              <strong>Título:</strong>{" "}
              {fragmento.tituloDelFragmento
                ? fragmento.tituloDelFragmento
                : "--"}
            </div>

            <div>
              <strong>Colección: </strong>
              {fragmento.coleccion ? fragmento.coleccion : "--"}.
            </div>

            <div>
              <strong>Realizador: </strong>
              {fragmento.realizador ? fragmento.realizador : "--"}.
            </div>

            <div>
              <strong>Ubicación: </strong>
              {fragmento.ubicacionGeografica
                ? fragmento.ubicacionGeografica
                : "--"}
              .
            </div>
          </Col>
          <Col>
            <div>
              <strong>Colocación: </strong>
              {fragmento.colocacion ? fragmento.colocacion : "--"}

              {fragmento.pietajeFin != -1
                ? fragmento.pietajeInicio
                  ? " " +
                    fragmento.pietajeInicio +
                    "'  " +
                    " " +
                    fragmento.pietajeFin +
                    "' "
                  : " "
                : ""}
            </div>
            {fragmento.codigoFechaOrEpoca === "F" ||
            fragmento.fechaOepoca === "fecha" ? (
              <div>
                <strong>Fecha: </strong>
                {fragmento.fechaMinParaLog
                  ? fragmento.fechaMinParaLog.substr(0, 10) + " "
                  : ""}
                {fragmento.fechaRangoMin
                  ? fragmento.fechaRangoMin.substr(0, 10) + " "
                  : ""}
              </div>
            ) : (
              <div>
                <strong>Época: </strong>
                {fragmento.fechaRangoMin
                  ? fragmento.fechaRangoMin.substr(0, 10) + " "
                  : ""}
                -{" "}
                {fragmento.fechaRangoMax
                  ? fragmento.fechaRangoMax.substr(0, 10)
                  : ""}
                {fragmento.fechaMinParaLog
                  ? fragmento.fechaMinParaLog.substr(0, 10) + " "
                  : ""}
                -{" "}
                {fragmento.fechaMaxParaLog
                  ? fragmento.fechaMaxParaLog.substr(0, 10)
                  : ""}
              </div>
            )}
            {fragmento.duracionMinutos === 0 &&
            fragmento.duracionSegundos === 0 ? (
              <div>
                <strong>Duración: </strong> Todo el fragmento.
              </div>
            ) : (
              <div>
                <strong>Duración: </strong>
                {fragmento.duracionMinutos ? fragmento.duracionMinutos : ""}m
                {fragmento.duracionSegundos ? fragmento.duracionSegundos : ""}s
              </div>
            )}
            <div>
              <strong>Observaciones: </strong>
              {fragmento.observaciones ? fragmento.observaciones : "--"}.
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  ) : (
    <div>
      <p>Cargando...</p>
    </div>
  );
};

export default CardRegistroFragmento;
