import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Card, CardBody, CardImg, CardTitle } from "shards-react";
import { login } from "../../api/user";
import { Context } from "../../Context";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FormLogin = () => {
  const { activateAuth } = useContext(Context);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [openSpinner, setOpenSpinner] = useState(false);

  const imgStyle = {
    width: "20%",
    height: "auto",
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = { usuario: usuario, password: password };
    try {
      setOpenSpinner(true);
      const response = await login(user);
      if (response.status === 200) {
        const header = response.headers["authorization"];
        const token = header.split("Bearer ")[1];
        activateAuth(token);
      } else {
        store.addNotification({
          message: "Usuario o contraseña incorrectos.",
          type: "danger",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
          insert: "bottom",
        });
      }
      setOpenSpinner(false);
    } catch (err) {
      store.addNotification({
        message: "Error conectando al servidor.",
        type: "danger",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        insert: "bottom",
      });
    }
  };

  return (
    <div className="row justify-content-center">
      <Card className="20rem ">
        <CardImg
          top
          src="data:image/png;base64,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"
          imgStyle={imgStyle}
        />

        <CardBody>
          <CardTitle className="text-center">Bienvenido</CardTitle>
          {!openSpinner ? (
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <div className="row align-items-center">
                  <div className="col-1">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="col">
                    <Form.Control
                      type="text"
                      placeholder="Usuario"
                      className="rounded"
                      required
                      onChange={(e) => {
                        setUsuario(e.target.value);
                      }}
                      value={usuario}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <div className="row align-items-center">
                  <div className="col-1">
                    <FontAwesomeIcon icon={faKey} />
                  </div>
                  <div className="col">
                    <Form.Control
                      className="rounded"
                      type="password"
                      placeholder="Contraseña"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </Form.Group>
              <div className="row justify-content-center ">
                <div className="col-4">
                  <Button>Entrar</Button>
                </div>
              </div>
            </Form>
          ) : (
            <div className="text-center">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default FormLogin;
