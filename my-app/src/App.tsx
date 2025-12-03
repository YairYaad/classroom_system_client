import React from "react";
import AppRouter from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/Layout/NavBar"; // Ensure this path is correct


const App: React.FC = () => (
  <BrowserRouter>
    {/* Navigation Bar appears at the very top */}
    <NavBar /> 
    
    {/* Apply the page-container class for content styling */}
    <div className="page-container">
        <AppRouter />
    </div>
  </BrowserRouter>
);

export default App;