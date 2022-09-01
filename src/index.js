import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {createStore} from 'redux'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer_toDo } from "./ToDOList/Redux/rootReducers/rootReducer";
let store=createStore(rootReducer_toDo)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>

        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
