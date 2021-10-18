import React, { useState } from "react";
import { Alert } from "reactstrap";
import {
  Button,
  Card,
  CardBody,
  FormInput,
  FormTextarea,
  Row,
  Col,
} from "shards-react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import FormPietaje from "../FormsSegmento/FormPietaje";
import FormTiempo from "../FormsSegmento/FormTiempo";
import VerificaSegmento from "../FormsSegmento/VerificaSegmento";

export const FormAltaSegmento = ({ updateSegmentos }) => {
  const [nwSegmento, setNwSegmento] = useState({
    colocacion: "",
    numRolloOrVolumenDeInicioDelSegmento: 0,
    idRegAcervo: null,
    idRegFragmentos: null,
    codigoPiesOrTiempoOrMetros: "",
    segmentoInicio: "",
    segmentoFin: "",
    contribuyeAlTiempoTotalDelFragmento: "S",
    idRegTransFragmentosAcervo: 0,
    pietajeInicio: 0,
    pietajeFin: 0,
    horaInicio: 0,
    minutoInicio: 0,
    segundoInicio: 0,
    horaFin: 0,
    minutoFin: 0,
    segundoFin: 0,
    sinopsis_segmento: null,
  });
  const [colocacion, setColocacion] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [numRolloVol, setNumRolloVol] = useState("");
  const [pietaje, setPietaje] = useState({
    pietajeInicio: 0,
    pietajeFin: 0,
  });
  const [tiempo, setTiempo] = useState({
    horaInicio: 0,
    horaFin: 0,
    minutoInicio: 0,
    minutoFin: 0,
    segundoInicio: 0,
    segundoFin: 0,
  });
  const [tipoSegmento, setTipoSegmento] = useState("");
  const [segmentoVerificado, setSegmentoVerificado] = useState(false);
  const [idSegmento, setIdSegmento] = useState("");
  const [visibleAlertPyT, setVisibleAlertPyT] = useState(false);
  const [visible, setVisible] = useState(false);

  const _setPietaje = (nwPietaje) => {
    setTiempo({
      horaInicio: 0,
      horaFin: 0,
      minutoInicio: 0,
      minutoFin: 0,
      segundoInicio: 0,
      segundoFin: 0,
    });
    var nw = nwSegmento;
    nw.codigoPiesOrTiempoOrMetros = "P";
    nw.segmentoInicio = "";
    nw.segundoFin = "";
    setNwSegmento(nw);
    setPietaje(nwPietaje);
  };

  const _setTiempo = (nwTiempo) => {
    setPietaje({
      pietajeInicio: 0,
      pietajeFin: 0,
    });
    var nw = nwSegmento;
    nw.codigoPiesOrTiempoOrMetros = "T";
    nw.segmentoInicio = "".concat(
      nwTiempo.horaInicio,
      ":",
      nwTiempo.minutoInicio,
      ":",
      nwTiempo.segundoInicio
    );
    nw.segmentoFin = "".concat(
      nwTiempo.horaFin,
      ":",
      nwTiempo.minutoFin,
      ":",
      nwTiempo.segundoFin
    );
    setNwSegmento(nw);
    setTiempo(nwTiempo);
  };

  const handleOnChangeVol = (e) => {
    setNumRolloVol(e.target.value);
  };

  const onShowAlert = () => {
    setVisible(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const handleOnSubmit = (e) => {
    // e.preventDefault();
    if (!(pietaje.flagCompleto || tiempo.flagCompleto)) {
      //setVisibleAlertPyT(true);
      store.addNotification({
        message: "Debes de llenar correctamente pietaje o tiempo",
        type: "info",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } else if (!segmentoVerificado) {
      store.addNotification({
        message: "Verifica la existencia del segmento",
        type: "info",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } else if (!numRolloVol) {
      store.addNotification({
        message: "Verifique el número de rollo o volumen",
        type: "info",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } else {
      setVisibleAlertPyT(false);

      var nw = nwSegmento;
      nw.idRegAcervo = tipoSegmento === "buda" ? idSegmento : null;
      nw.idreg_copias_titulos = tipoSegmento === "claf" ? idSegmento : null;
      nw.horaInicio = tiempo.horaInicio;
      nw.horaFin = tiempo.horaFin;
      nw.minutoInicio = tiempo.minutoInicio;
      nw.minutoFin = tiempo.minutoFin;
      nw.segundoInicio = tiempo.segundoInicio;
      nw.segundoFin = tiempo.segundoFin;
      nw.pietajeInicio = pietaje.pietajeInicio;
      nw.pietajeFin = pietaje.pietajeFin;
      nw.colocacion = colocacion;
      nw.numRolloOrVolumenDeInicioDelSegmento = numRolloVol;
      nw.sinopsis_segmento = sinopsis;
      updateSegmentos(nw);

      setColocacion("");
      setSegmentoVerificado(false);
      setIdSegmento("");
      setTipoSegmento("");
      setNumRolloVol("");
      setPietaje({
        pietajeInicio: 0,
        pietajeFin: 0,
      });
      setTiempo({
        horaInicio: 0,
        horaFin: 0,
        minutoInicio: 0,
        minutoFin: 0,
        segundoInicio: 0,
        segundoFin: 0,
      });
      setSinopsis("");
      setNwSegmento({
        colocacion: "",
        numRolloOrVolumenDeInicioDelSegmento: 0,
        idRegAcervo: null,
        idRegFragmentos: null,
        codigoPiesOrTiempoOrMetros: "",
        segmentoInicio: "",
        segmentoFin: "",
        contribuyeAlTiempoTotalDelFragmento: "S",
        idRegTransFragmentosAcervo: 0,
        pietajeInicio: 0,
        pietajeFin: 0,
        horaInicio: 0,
        minutoInicio: 0,
        segundoInicio: 0,
        horaFin: 0,
        minutoFin: 0,
        segundoFin: 0,
        sinopsis_segmento: null,
      });

      onShowAlert();
    }
  };

  return (
    <div className="col pt-3">
      <Alert color="success" isOpen={visible}>
        Segmento Agregado a la lista.
      </Alert>
      <Row>
        <Col className=" mb-3">
          <VerificaSegmento
            setAutorizaSegmento={setSegmentoVerificado}
            setTipoSegmento={setTipoSegmento}
            setIdSegmento={setIdSegmento}
            setColocacion={setColocacion}
            tipoSegmento={tipoSegmento}
            claveCLAF={idSegmento}
            claveBUDA={idSegmento}
            colocBUDA={colocacion}
          />
        </Col>
        <Col className="pt-4">
          <FormInput
            className="rounded text-dark"
            type="number"
            value={numRolloVol}
            placeholder="Numero de rollo o volumen"
            onChange={handleOnChangeVol}
            required
          />
        </Col>
      </Row>

      <div className="row">
        <div className="col">
          <Card className="20rem">
            <CardBody>
              <label className="h4 text-center mb-2 mt-2">Pietaje</label>
              <FormPietaje setPietaje={_setPietaje} pietaje={pietaje} />
            </CardBody>
          </Card>
        </div>
        <div className="col">
          <Card>
            <CardBody>
              <label className="h4 text-center mb-2 mt-2">Tiempo</label>
              <FormTiempo setTiempo={_setTiempo} tiempo={tiempo} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="text-center mt-3 h5">Sinopsis</div>
      <Row className="mt-2 mb-2">
        <Col>
          <FormTextarea
            placeholder="Ingresa aquí la descripcion"
            onChange={(e) => {
              setSinopsis(e.target.value);
            }}
            value={sinopsis}
          />
        </Col>
      </Row>
      <div className="row pt-1 pb-3">
        <Button
          className=" col-4 offset-4"
          theme="primary"
          onClick={handleOnSubmit}
        >
          Agregar Segmento a la lista
        </Button>
      </div>
    </div>
  );
};
export default FormAltaSegmento;
