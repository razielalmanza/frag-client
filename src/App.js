import React, { Suspense, useContext, useEffect } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Buscador from "./pages/Buscador";
import Alta from "./pages/Alta";
import NavBar from "./components/NavBar/NavBar";
import ListaResultados from "./pages/ResultadosBusqueda";
import Editar from "./pages/Editar";
import { Context } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";
//import "./styles/styles.css";

import "shards-ui/dist/css/shards.min.css";

export const App = () => {
  const { isAuth } = useContext(Context);

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return (
    <Suspense fallback={<div />}>
      <ReactNotification />
      <NavBar />
      <div className=" container-fluid mt-2">
        <Router>
          <NotFound default />
          {!isAuth && <Redirect noThrow from="/" to="/login" />}
          {!isAuth && <Login path="/login" />}
          {!isAuth && <Redirect noThrow from="/home" to="/login" />}
          {!isAuth && <Redirect noThrow from="/buscador" to="login" />}
          {!isAuth && <Redirect noThrow from="/darAlta" to="/login" />}
          {!isAuth && <Redirect noThrow from="/resultados" to="/login" />}
          {!isAuth && <Redirect noThrow from="/editar" to="/login" />}
          {isAuth && <Redirect noThrow from="/login" to="/home" />}
          {isAuth && <Redirect noThrow from="/" to="/home" />}

          <Home path="/home" />
          <Buscador path="/buscador" />
          <Alta path="/darAlta" />
          <ListaResultados path="/resultados/:consulta" />
          <Editar path="/editar/:idFragmento" />
        </Router>
      </div>
    </Suspense>
  );
};

export default App;
