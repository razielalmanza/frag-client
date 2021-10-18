import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DescriptorObjIdentificados from "./DescriptorObjIdentificados";

export const SearchIdentificados = ({ updateIdentificados, data }) => {
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
        updateIdentificados([...items, nwInput]);
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
    updateIdentificados([...items]);
  };

  return (
    <div className="col">
      <label className="mt-2">
        <strong>Personajes, objetos y acciones identificados:</strong>
      </label>

      <div className="row">
        <div className="col">
          <Form.Control
            className="rounded text-dark"
            type="text"
            placeholder="Separa las etiquetas por una coma ' , '"
            onChange={handleOnChange}
            value={nwItem}
          />
        </div>
      </div>

      <DescriptorObjIdentificados items={data} _handleDelete={_delete} />
    </div>
  );
};

export default SearchIdentificados;
