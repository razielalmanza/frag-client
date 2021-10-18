import React, { useState } from "react";
import {
  InputGroup,
  FormInput,
  InputGroupText,
  InputGroupAddon,
} from "shards-react";

const SearchColeccion = ({ setColeccion, input }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setColeccion(e.target.value);
  };

  return (
    <div>
      <InputGroup className="mb-2">
        <InputGroupAddon type="prepend">
          <InputGroupText>Colección</InputGroupText>
        </InputGroupAddon>
        <FormInput type="text" onChange={handleOnChange} value={entrada} />
      </InputGroup>
    </div>
  );
};
export default SearchColeccion;
