import React, { useState } from "react";
export const Observaciones = ({ setObservaciones, input }) => {
  const [entrada, setEntrada] = useState(input);

  const handleOnChange = (e) => {
    setEntrada(e.target.value);
    setObservaciones(e.target.value);
  };

  return (
    <div>
      <div className="pt-2">
        <textarea
          className="form-control col rounded"
          placeholder="Agrega tus observaciones"
          rows="3"
          onChange={handleOnChange}
          value={entrada}
        />
      </div>
    </div>
  );
};

export default Observaciones;
