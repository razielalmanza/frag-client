import React, { useState } from "react";
import {
  InputGroup,
  FormInput,
  InputGroupText,
  InputGroupAddon,
} from "shards-react";

const SearchRealizador = ({ setRealizador, input }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setRealizador(e.target.value);
  };

  return (
    <div>
      <InputGroup className="mb-2">
        <InputGroupAddon type="prepend">
          <InputGroupText>Realizador</InputGroupText>
        </InputGroupAddon>
        <FormInput type="text" onChange={handleOnChange} value={entrada} />
      </InputGroup>
    </div>
  );
};
export default SearchRealizador;
