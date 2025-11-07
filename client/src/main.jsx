import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { AuthLoader } from "./AuthLoader"; // Import AuthLoader
import "./index.css"; // or "./App.css"


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthLoader>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthLoader>
    </AuthProvider>
  </React.StrictMode>
);
