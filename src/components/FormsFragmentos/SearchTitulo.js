import React, { useState } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
} from "shards-react";

export const SearchTitulo = ({ setTitulo, required, input }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setTitulo(e.target.value);
  };

  return (
    <div>
      {required ? (
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText>Título de fragmento</InputGroupText>
          </InputGroupAddon>
          <FormInput type="text" onChange={handleOnChange} value={entrada} />
        </InputGroup>
      ) : (
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText>Título de fragmento</InputGroupText>
          </InputGroupAddon>
          <FormInput type="text" onChange={handleOnChange} value={entrada} />
        </InputGroup>
      )}
    </div>
  );
};

export default SearchTitulo;
