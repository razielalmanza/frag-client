import React from "react";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardBody, Row, Col } from "shards-react";

const CardListSegmentos = ({ segmentos }) => {
  //console.log(segmentos);
  return segmentos ? (
    <div>
      <ul className="list-group">
        {segmentos.map((item, id) => {
          return (
            <div key={id}>
              <div className="row pt-2 bg-warning">
                <div className="col h5 text-center">
                  SEGMENTO: {item.tituloOriginal}{" "}
                </div>
              </div>

              <Card className="col mb-3">
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <li className="list-group-item ">
                        <div className="row ">
                          <Table responsive>
                            <tbody>
                              <tr>
                                <th>Realización:</th>
                                <td>
                                  {" "}
                                  <b> Realizador: </b>
                                  {item.realizador}{" "}
                                </td>
                                <td>
                                  <b> País: </b> {item.paisDeRealizacion}
                                </td>
                                <td>
                                  <b> Año: </b> {item.anioDeProduccion}
                                </td>
                              </tr>
                              <tr>
                                <th>Ubicación:</th>
                                <td>
                                  {" "}
                                  <b>Colocación: </b> {item.colocacion}{" "}
                                </td>
                                {item.idreg_copias_titulos === null ? (
                                  <td>
                                    {" "}
                                    <b>
                                      idRegAcervo (BUDA): {item.idRegAcervo}{" "}
                                    </b>
                                  </td>
                                ) : (
                                  <td>
                                    {" "}
                                    <b>
                                      idreg_copias_titulos (CLAF):{" "}
                                      {item.idreg_copias_titulos}{" "}
                                    </b>
                                  </td>
                                )}
                              </tr>
                              <tr>
                                <th>Características:</th>
                                <td>
                                  {" "}
                                  <b>Formato: </b> {item.formato}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Soporte: </b> {item.soporte}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Emulsión: </b> {item.emulsion}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Color: </b> {item.color}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Audio: </b> {item.audio}{" "}
                                </td>
                              </tr>
                              <tr>
                                <th>Estado:</th>
                                <td>
                                  {" "}
                                  <b>No. de rollos: </b> {item.tama}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Metraje: </b> {item.metraje}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Daños: </b> {item.danios}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Estado físico: </b> {item.estadoFisico}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Audio: </b> {item.audio}{" "}
                                </td>
                              </tr>
                              <tr>
                                <th>Legal:</th>
                                <td>
                                  {" "}
                                  <b>Origen: </b> {item.origen}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Origen (2): </b> {item.origenDos}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Daños: </b> {item.danios}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Estado físico: </b> {item.estadoFisico}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Posobilidad exhibición: </b>{" "}
                                  {item.posibilidadDeExhibicion}{" "}
                                </td>
                                <td>
                                  {" "}
                                  <b>Posobilidad prestamo: </b>{" "}
                                  {item.posibilidadDePrestamo}{" "}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table responsive>
                            <tbody>
                              <tr>
                                <th>Observaciones:</th>
                                <td className="col text-left">
                                  {" "}
                                  {item.observaciones}{" "}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table responsive>
                            <tbody>
                              <tr>
                                <th>Sinopsis:</th>
                                <td className="col text-left">
                                  {" "}
                                  {item.sinopsis_segmento}{" "}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </li>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </ul>
    </div>
  ) : (
    <Row className="justify-content-center">
      <Col md="3">
        <Spinner animation="grow" /> Cargando información ...
      </Col>
    </Row>
  );
};

export default CardListSegmentos;
