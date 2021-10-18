import "animate.css";
import classnames from "classnames";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { Badge } from "shards-react";
import FormAltaSegmento from "../components/Alta/FormAltaSegmento";
import FormAltaFragmento from "../components/Alta/FormAltaFragmento";
import ModalListaSegmentos from "../components/Alta/ModalListaSegmentos";
import ModalRegistrar from "../components/Alta/ModalRegistrar";

export const Alta = () => {
  const [nwSegmentos, setNwSegmentos] = useState([]);
  const [hayFragmento, setHayFragmento] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [nwFragmento, setNwFragmento] = useState([]);

  const setSegmentos = (segmentos) => {
    setNwSegmentos([...segmentos]);
  };

  const setFragmento = (frag) => {
    setNwFragmento({ ...frag });
    setHayFragmento(true);
    store.addNotification({
      title: "",
      message: "Fragmento Agregado",
      type: "success",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      },
    });
  };

  const updateSegmentos = (segmento) => {
    setNwSegmentos([...nwSegmentos, segmento]);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  var activaRegistrar = nwSegmentos.length > 0 && hayFragmento; //true;

  /* return !fragmentoRecibido ? (
    <Row className="justify-content-center">
      <Col md="3">
        <Spinner animation="grow" /> Cargando información ...
      </Col>
    </Row>
  ) : ( */
  return (
    <div>
      <div className="row  mb-3">
        <div className="col-md-4 offset-md-4 text-center h3">
          ALTA DE FRAGMENTO
        </div>

        <div className="col-md-4 ml-auto">
          <ModalRegistrar
            activaRegistrar={activaRegistrar}
            fragmento={nwFragmento}
            segmentos={nwSegmentos}
          />
        </div>
      </div>
      <div className="row justify-content-end ">
        <div className="col-1-sm float-right">
          <Badge theme="danger">{nwSegmentos.length}</Badge>
        </div>
        <div className="col-2 ">
          <ModalListaSegmentos
            items={nwSegmentos}
            setSegmentos={setSegmentos}
          />
        </div>
      </div>

      <p>
        Bríndanos algunos datos del nuevo fragmento: <br />
        RECUERDA que cada fragmento debe ser registrado con{" "}
        <strong>al menos un segmento.</strong>
      </p>

      <Nav tabs className="boder-dark">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            DESCRIPCIÓN DE FRAGMENTO
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            DESCRIPCIÓN DE UN SEGEMENTO
          </NavLink>
        </NavItem>
      </Nav>
      <div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <FormAltaFragmento
                setFragmentoPadre={setFragmento}
                setHayFragmento={setHayFragmento}
                dataFragmento={nwFragmento}
              />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <FormAltaSegmento
                updateSegmentos={updateSegmentos}
                dataSegmento={nwSegmentos}
              />
            </Row>
          </TabPane>
        </TabContent>
      </div>

      <Row className="justify-content-center">
        <Col md="4 mb-3">
          <ModalRegistrar
            activaRegistrar={activaRegistrar}
            fragmento={nwFragmento}
            segmentos={nwSegmentos}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Alta;
