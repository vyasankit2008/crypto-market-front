import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const RealtimeData = () => {
    const [spotData, setSpotData] = useState(null);
    const [futuresData, setFuturesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.on("marketUpdate", (data) => {
            if (data.marketType === "Spot") {
                setSpotData(data);
            } else if (data.marketType === "Futures") {
                setFuturesData(data);
            }
            setLoading(false);
        });

        return () => {
            socket.off("marketUpdate");
        };
    }, []);

    return (
        <div className="realtime-container">
            <h1 className="realtime-header">Real-Time Data</h1>
            <div className="realtime-grid">
                <div className="trade-box">
                    <h2>📈 Binance Spot</h2>
                    {loading ? <p>⏳ Waiting for data...</p> :
                        spotData ? (
                            <>
                                <p><strong>Price:</strong> ${spotData.price}</p>
                                <p><strong>Quantity:</strong> {spotData.quantity} BTC</p>                                
                                <p><strong>Time:</strong> {spotData.time}</p>
                            </>
                        ) : <p>❌ No trade data available</p>
                    }
                </div>
                <div className="trade-box">
                    <h2>📉 Binance Futures</h2>
                    {loading ? <p>⏳ Waiting for data...</p> :
                        futuresData ? (
                            <>
                                <p><strong>Price:</strong> ${futuresData.price}</p>
                                <p><strong>Quantity:</strong> {futuresData.quantity} BTC</p>
                                <p><strong>Time:</strong> {futuresData.time}</p>
                            </>
                        ) : <p>❌ No trade data available</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default RealtimeData;
