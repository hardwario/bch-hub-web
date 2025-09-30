import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Layout from './components/Layout';
import RadioManagerModel from "./model/RadioManager";
import MqttLogModel from "./model/MqttLog";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/scss/index.scss";
import "./favicons";

const hostname = location.hostname;
// const mqttUri = "ws://" + hostname + ":9001";
const mqttUri = "ws://192.168.3.104:9001";
const node_red_src = "http://" + hostname + ":1880/";
const node_red_src_ui = "http://" + hostname + ":1880/ui";

class App extends Component {

    constructor(props) {
        super(props);

        this.radiomanager = new RadioManagerModel();
        this.mqttlog = new MqttLogModel();

        this.state = {
            visible: true,
            gatewayConnect: false,
            mqttConnect: null,
        };
    }

    componentDidMount() {
        console.log("App:componentDidMount");

        this.radiomanager.on('connect', this.onGatewayConnect.bind(this));
        this.radiomanager.on('mqttConnect', this.onmqttConnect.bind(this));

        this.radiomanager.connect(mqttUri);
        this.mqttlog.connect(mqttUri);
    }

    componentWillUnmount() {
        console.log("App:componentWillUnmount");
    }

    onGatewayConnect(status) {
        this.setState({ gatewayConnect: status });
    }
    onmqttConnect(status) {
        this.setState({ mqttConnect: status });
    }

    render() {
        const warningIconStyle = {
            color: '#ffe100',
            float: 'right',
            verticalAlign: 'baseline',
            paddingTop: '3px',
            fontSize: '16px'
        };

        return <HashRouter>
            <div id="app" >
                <div id="navbar" key="navbar">
                    <aside className="" >
                        <nav>
                            <NavLink to="/" title={this.state.gatewayConnect === false ? "No Radio USB Dongle connected" : null}>Devices{this.state.gatewayConnect === false ? <FontAwesomeIcon icon={faExclamationTriangle} style={warningIconStyle} /> : null}</NavLink>
                            <NavLink to="/functions">Functions</NavLink>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/messages">Messages</NavLink>
                        </nav>

                        <nav className="bottom">
                            {window.navBotomText}
                        </nav>
                        <a href="https://www.hardwario.com/" target="_blank">
                            <img src={require("./assets/images/hw-logo-white.svg")} className="logo" />
                        </a>
                    </aside>
                </div>
                <Layout
                    radiomanager={this.radiomanager}
                    mqttlog={this.mqttlog}
                    node_red_src={node_red_src}
                    node_red_src_ui={node_red_src_ui}
                />
            </div>
        </HashRouter>;
    };

}

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<App />);
