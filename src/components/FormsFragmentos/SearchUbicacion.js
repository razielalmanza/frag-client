import React, { useState } from "react";
import {
  InputGroup,
  FormInput,
  InputGroupText,
  InputGroupAddon,
} from "shards-react";

const SearchUbicacion = ({ setUbicacion, input }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setUbicacion(e.target.value);
  };

  return (
    <div>
      <InputGroup className="mb-2">
        <InputGroupAddon type="prepend">
          <InputGroupText>Lugar</InputGroupText>
        </InputGroupAddon>
        <FormInput type="text" onChange={handleOnChange} value={entrada} />
      </InputGroup>
    </div>
  );
};

export default SearchUbicacion;
