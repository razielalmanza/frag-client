import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Col } from "shards-react";
import DescriptorObjImplicitos from "./DescriptorObjImplicitos";

export const SearchImplicitos = ({ updateImplicitos, data }) => {
  const [nwItem, setNwItem] = useState("");
  const [items, setItems] = useState([...data]);

  const handleOnChange = (e) => {
    //console.log(data);
    e.preventDefault();
    let input = e.target.value;
    setNwItem(input);
    var len = input.length;
    if (input.indexOf(",") === len - 1) {
      var nwInput = input.substring(0, len - 1);
      if (nwInput !== "") {
        setItems([...items, nwInput]);
        updateImplicitos([...items, nwInput]);
        setNwItem("");
      } else {
        setNwItem("");
      }
    }
  };

  useEffect(() => {
    setItems([...data]);
  }, [data]);

  const _delete = (id) => {
    //console.log(id);
    //let temp =  items;

    items.splice(id, 1);
    setItems([...items]);
    updateImplicitos([...items]);
  };

  return (
    <Col>
      <label className="mt-2 ">
        <strong>Objetos y acciones implícitos:</strong>
      </label>

      <div className="row">
        <div className="col ">
          <Form.Control
            className="rounded text-dark"
            type="text"
            placeholder="Separa las etiquetas por una coma ' , ' "
            onChange={handleOnChange}
            value={nwItem}
          />
        </div>
      </div>

      <DescriptorObjImplicitos items={data} _handleDelete={_delete} />
    </Col>
  );
};
export default SearchImplicitos;
