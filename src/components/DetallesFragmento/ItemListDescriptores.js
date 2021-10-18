import React from "react";
import { Col, Row } from "shards-react";
import "../../styles/Descriptor.css";

export const ItemListDescriptores = ({ items }) => {
  return (
    <Row className="d-flex flex-wrap justify-content-center pl-1 pr-1">
      {items.map((item, id) => {
        return (
          <Col
            md={item.length < 100 ? "3" : "12"}
            className="border border-dark rounded text-center mt-1 mb-1 mr-1"
          >
            {item}
          </Col>
        );
      })}
    </Row>
  );
};

export default ItemListDescriptores;
