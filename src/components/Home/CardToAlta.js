import { Link } from "@reach/router";
import React from "react";
import { Card, CardBody, Col, Row } from "shards-react";
import iconAlta from "../../assets/images/altaFragmento.png";
import { BigIcon } from "../BigIcon/index";

export const CardToAlta = () => {
  return (
    <Link to="/darAlta" className="text-dark">
      <Card>
        <CardBody>
          <Row>
            <Col className="mt-3">
              <h5>Registrar nuevo fragmento</h5>
            </Col>
            <Col md="4">
              <BigIcon imgSrc={iconAlta} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Link>
  );
};
export default CardToAlta;
