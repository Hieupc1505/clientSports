import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobelStyles from "./components/GlobelStyles";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GlobelStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobelStyles>
    </React.StrictMode>
);
