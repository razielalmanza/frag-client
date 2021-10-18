import React, { useEffect, useState } from "react";
import classnames from "classnames";
import "animate.css";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  Nav,
  NavItem,
  NavLink,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import { Badge, Col, Row } from "shards-react";
import { fragmentoConSegmentos } from "../api/detallesFragmento";
import FormAltaSegmento from "../components/Alta/FormAltaSegmento";
import ModalListaSegmentos from "../components/Alta/ModalListaSegmentos";
import ConfirmacionEditar from "../components/Editar/ConfirmacionEditar";
import ModalCancelar from "../components/Editar/ModalCancelar";
import FormEditarFragmento from "../components/Editar/FormEditarFragmento";
import { redirect } from "../components/utils/Redirect";

export const Editar = ({ idFragmento }) => {
  const [nwFragmento, setNwFragmento] = useState({});
  const [nwSegmentos, setNwSegmentos] = useState([]);
  const [hayFragmento, setHayFragmento] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [fragmentoRecibido, setFragmentoRecibido] = useState(false);
  //const [activaRegistrar, setActtivaRegistrar]=useState(false);

  useEffect(() => {
    if (!fragmentoRecibido) {
      getData();
    }
  }, [fragmentoRecibido]);

  const getData = async () => {
    try {
      var respuesta = await fragmentoConSegmentos(idFragmento);
      if (respuesta === 403) {
        console.log("error de acceso.");
        redirect();
      }
      var procesada = preProcesaConsulta(respuesta);

      setNwFragmento(procesada);
      if (procesada.alSegmentos) {
        setNwSegmentos([...procesada.alSegmentos]);
      }
      console.log(respuesta);

      setFragmentoRecibido(true);
    } catch (error) {
      store.addNotification({
        title: "Error",
        message: "Intentalo más tarde",
        type: "danger",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      console.log(error);
    }
  };

  /**
   * Crea el formato Date() en
   * strFechaRangoMin y strFechaRangoMax ya que los
   * atributos mesInicio vienen en formato 1-12 y Date() solo
   * funciona con rango 0-11
   */
  const preProcesaConsulta = (consulta) => {
    var temp = consulta;
    temp.idRegFragmento = temp.idReg;
    if (temp.codigoFechaOrEpoca === "E") {
      var epocaInicio = new Date(temp.strFechaRangoMin);
      var epocaFin = new Date(temp.strFechaRangoMax);
      temp.strFechaRangoMin = epocaInicio;
      temp.strFechaRangoMax = epocaFin;
    } else {
      var fechaExacta = new Date(temp.strFechaRangoMin);
      temp.strFechaRangoMax = fechaExacta;
      temp.strFechaRangoMin = fechaExacta;
    }
    return temp;
  };

  const setSegmentos = (segmentos) => {
    setNwSegmentos([...segmentos]);
  };

  const setFragmento = (frag) => {
    setNwFragmento({ ...frag });
    setHayFragmento(true);
    store.addNotification({
      message: "Fragmento actualizado",
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

  return !fragmentoRecibido ? (
    <Row className="justify-content-center">
      <Col md="3">
        <Spinner animation="grow" /> Cargando información ...
      </Col>
    </Row>
  ) : (
    <div className="container-fluid">
      <div className="row">
        <Col md="2" className="pt-4">
          <ModalCancelar />
        </Col>
        <div className="col">
          <p className="h3 p-4 offset-3">EDICIÓN DE FRAGMENTO</p>
        </div>

        <div className="col-4 pt-4">
          <ConfirmacionEditar
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

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <FormEditarFragmento
            setFragmentoPadre={setFragmento}
            setHayFragmento={setHayFragmento}
            dataFragmento={nwFragmento}
          />
        </TabPane>
        <TabPane tabId="2">
          <FormAltaSegmento
            updateSegmentos={updateSegmentos}
            dataSegmento={nwSegmentos}
          />
        </TabPane>
      </TabContent>

      <Row className="justify-content-center">
        <Col md="4 mb-3">
          <ConfirmacionEditar
            activaRegistrar={activaRegistrar}
            fragmento={nwFragmento}
            segmentos={nwSegmentos}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Editar;
