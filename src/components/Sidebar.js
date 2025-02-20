import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import TimelineIcon from "@mui/icons-material/Timeline";

const Sidebar = ({ onToggle, isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">{isOpen ? "Crypto Market" : ""}</div>
                <IconButton className="menu-button" onClick={onToggle}>
                    <MenuIcon />
                </IconButton>
            </div>

            <List>
                <ListItem component={Link} to="/historical-data" className="sidebar-item">
                    <ListItemIcon className="sidebar-icon">
                        <HistoryIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Historical Data" className="sidebar-text" />}
                </ListItem>

                <ListItem component={Link} to="/realtime-data" className="sidebar-item">
                    <ListItemIcon className="sidebar-icon">
                        <TimelineIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="RealTime Data" className="sidebar-text" />}
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
