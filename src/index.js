import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./Context";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
