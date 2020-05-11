import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, NavLink } from "react-router-dom";

import { RouteIframe, RouteWithProps } from "./components/Route";
import RadioManager from "./components/RadioManager";
import MqttLog from "./components/MqttLog";

import RadioManagerModel from "./model/RadioManager";
import MqttLogModel from "./model/MqttLog";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/scss/index.scss";
import "./favicons";

var hostname = location.hostname; //"hub.local";

var mqttws = "ws://" + hostname + ":9001";
var node_red_src = "http://" + hostname + ":1880/";

class App extends Component {

    constructor(props) {
        super(props);
        
        this.radiomanager = new RadioManagerModel();
        this.mqttlog = new MqttLogModel();

        this.state = {
            visible: true,
            gatewayConnect: null,
            mqttConnect: null,
        };        
    }

    componentDidMount() {
        console.log("App:componentDidMount");

        this.radiomanager.on('connect', this.onGatewayConnect.bind(this));
        this.radiomanager.on('mqttConnect', this.onmqttConnect.bind(this));

        this.radiomanager.connect(mqttws);
        this.mqttlog.connect(mqttws);
    }

    componentWillUnmount() {
        console.log("App:componentWillUnmount");
    }

    onGatewayConnect(status) {
        this.setState({gatewayConnect: status});
    }
    onmqttConnect(status) {
        this.setState({mqttConnect: status});
    }

    render() {
	  return  <HashRouter>
	    <div id="app" >
	      <div id="navbar" key="navbar">
		  <aside className="">
		      <nav>
		          <NavLink to="/" exact title={this.state.gatewayConnect === false ? "No Radio USB Dongle connected" : null}>Devices{this.state.gatewayConnect === false ?  <i className="fa fa-warning"></i> : null}</NavLink>
		          <NavLink to="/functions">Functions</NavLink>
		          <NavLink to="/dashboard">Dashboard</NavLink>
		          <NavLink to="/messages">Messages</NavLink>
		      </nav>

		      <nav className="bottom">
		      </nav>
                        <a href="https://www.hardwario.com/" target="_blank">
                            <img src={require("./assets/images/hw-logo-white.svg")} className="logo" />
              </a>
		  </aside>
		</div>

		<main key="main">
		  <RouteWithProps path="/" exact component={RadioManager} model={this.radiomanager} />
		  <RouteWithProps path="/messages" component={MqttLog} model={this.mqttlog} />
		  <RouteIframe path="/functions" src={node_red_src} id="node-red" />
		  <RouteIframe path="/dashboard" src={node_red_src + "ui"} />
	    </main>
	      
	    </div>
	  </HashRouter>;
	};

}

ReactDOM.render(<App />, document.getElementById("index"));
