import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

// с помощью реакта рендерим элемент app туда куда нужно
//  т.е. параметры передаются через запятую (=что, куда)
ReactDOM.render(
    <App />,
    document.querySelector(`#root`)
);

