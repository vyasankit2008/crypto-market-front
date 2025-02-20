import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HistoricalData from "./pages/HistoricalData";
import RealtimeData from "./pages/RealtimeData";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/historical-data" replace />} />
            <Route path="/historical-data" element={<HistoricalData />} />
            <Route path="/realtime-data" element={<RealtimeData />} />                    
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
