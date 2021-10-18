import React, { useState } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
} from "shards-react";

export const GenericInput = ({ setInput, required, input, label }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setInput(e.target.value);
  };
  return (
    <div>
      {required ? (
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText className="text-dark">{label}</InputGroupText>
          </InputGroupAddon>
          <FormInput
            type="text"
            onChange={handleOnChange}
            value={entrada}
            required
          />
        </InputGroup>
      ) : (
        <InputGroup className="mb-2">
          <InputGroupAddon type="prepend">
            <InputGroupText className="text-dark">{label}</InputGroupText>
          </InputGroupAddon>
          <FormInput type="text" onChange={handleOnChange} value={entrada} />
        </InputGroup>
      )}
    </div>
  );
};

export default GenericInput;
