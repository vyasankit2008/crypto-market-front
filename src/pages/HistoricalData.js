import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    Grid, TextField, Select, MenuItem, FormControl, InputLabel,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    CircularProgress
} from "@mui/material";

const HistoricalData = () => {
    const [exchange, setExchange] = useState("binance");
    const [marketType, setMarketType] = useState("spot");
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setInterval] = useState("1m");
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const url = `http://localhost:5000/api/historicaldata/${exchange}/${marketType}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
            const response = await axios.get(url);

            if (response.data.code === "400100") {
                setData([]);
                setErrorMsg("No record found");
                setLoading(false);
                return;
            }

            let formattedData = [];
            if (exchange === "binance") {
                formattedData = response.data.map((entry) => ({
                    timestamp: new Date(entry[0]).toLocaleString(),
                    open: parseFloat(entry[1]),
                    high: parseFloat(entry[2]),
                    low: parseFloat(entry[3]),
                    close: parseFloat(entry[4]),
                    volume: parseFloat(entry[5])
                }));
            } else if (exchange === "kucoin") {
                formattedData = response.data.data.map((entry) => ({
                    timestamp: new Date(parseInt(entry[0]) * 1000).toLocaleString(),
                    open: parseFloat(entry[1]),
                    high: parseFloat(entry[3]),
                    low: parseFloat(entry[4]),
                    close: parseFloat(entry[2]),
                    volume: parseFloat(entry[5])
                }));
            }

            setData(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setErrorMsg("No record found");
        }
        setLoading(false);
    }, [exchange, marketType, symbol, interval, limit]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="historical-container">
            <h1 className="historical-header">Historical Data</h1>
            <Grid container spacing={2} alignItems="center" sx={{ my: 2 }}>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="exchange-label">Exchange</InputLabel>
                        <Select
                            labelId="exchange-label"
                            value={exchange}
                            onChange={(e) => setExchange(e.target.value)}
                            label="Exchange"
                        >
                            <MenuItem value="binance">Binance</MenuItem>
                            <MenuItem value="kucoin">KuCoin</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="market-label">Market</InputLabel>
                        <Select
                            labelId="market-label"
                            value={marketType}
                            onChange={(e) => setMarketType(e.target.value)}
                            label="Market"
                        >
                            <MenuItem value="spot">Spot</MenuItem>
                            <MenuItem value="futures">Futures</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="interval-label">Interval</InputLabel>
                        <Select
                            labelId="interval-label"
                            value={interval}
                            onChange={(e) => setInterval(e.target.value)}
                            label="Interval"
                        >
                            <MenuItem value="1m">1 min</MenuItem>
                            <MenuItem value="5m">5 min</MenuItem>
                            <MenuItem value="15m">15 min</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="limit-label">Limit</InputLabel>
                        <Select
                            labelId="limit-label"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            label="Limit"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {loading ? (
                <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Open</TableCell>
                                <TableCell>High</TableCell>
                                <TableCell>Low</TableCell>
                                <TableCell>Close</TableCell>
                                <TableCell>Volume</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        {errorMsg || "No record found"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.timestamp}</TableCell>
                                        <TableCell>{row.open}</TableCell>
                                        <TableCell>{row.high}</TableCell>
                                        <TableCell>{row.low}</TableCell>
                                        <TableCell>{row.close}</TableCell>
                                        <TableCell>{row.volume}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default HistoricalData;
