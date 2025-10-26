import React from "react";
import AppRouter from "./routes/Router";
import { BrowserRouter } from "react-router-dom";



const App: React.FC = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default App;
