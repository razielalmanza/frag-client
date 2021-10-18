import { Link } from "@reach/router";
import React from "react";
import { Card, CardBody, Col, Row } from "shards-react";
import iconBuscador from "../../assets/images/buscador.png";
import { BigIcon } from "../BigIcon/index";

export const CardToBuscar = () => {
  return (
    <Link to="/buscador" className="text-dark">
      <Card>
        <CardBody>
          <Row>
            <Col className="mt-3">
              <h5>Búsqueda avanzada</h5>
            </Col>
            <Col md="4">
              <BigIcon imgSrc={iconBuscador} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Link>
  );
};
export default CardToBuscar;
