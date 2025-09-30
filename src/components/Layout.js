import React from 'react';
import { Routes, Route } from "react-router-dom";
import RadioManager from "./RadioManager";
import MqttLog from "./MqttLog";

const IframePage = ({ src, id }) => (
    <iframe src={src} id={id} className="route" style={{ width: '100%', height: '100%', border: 'none' }} />
);

const Layout = ({ radiomanager, mqttlog, node_red_src, node_red_src_ui }) => {
    return (
        <main key="main">
            <Routes>
                <Route path="/" element={<RadioManager model={radiomanager} />} />
                <Route path="/messages" element={<MqttLog model={mqttlog} />} />
                <Route path="/functions" element={<IframePage src={node_red_src} id="node-red" />} />
                <Route path="/dashboard" element={<IframePage src={node_red_src_ui} />} />
            </Routes>
        </main>
    );
};

export default Layout;