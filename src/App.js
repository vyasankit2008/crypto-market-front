import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import "./App.css";

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <Router>
            <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className={`content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                    <AppRoutes />
                </div>
            </div>
        </Router>
    );
};

export default App;
