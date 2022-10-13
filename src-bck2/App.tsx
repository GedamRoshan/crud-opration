import React from "react";
import "./App.css";
import MainRouter from "./routers";
import { store } from "../src/store";
import { Provider } from "react-redux";
import './i18n';

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;
