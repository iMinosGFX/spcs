import * as React from "react";
import * as ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom"
import { App } from "./App";
import { Provider } from "react-redux";
import {store} from "./store"
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <HashRouter>
    <ToastProvider placement={"bottom-right"} autoDismiss={true} autoDismissTimeout={3000}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ToastProvider>
  </HashRouter>,
  document.getElementById("root")
);