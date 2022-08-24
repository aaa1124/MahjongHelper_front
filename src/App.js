

import React, { useState } from 'react';

import { Player2 } from "./components/Player.js";

//import * as Test from "./Test.js"
import * as Records from "./components/Records.js.js"
//import { w3cwebsocket as W3CWebSocket } from "websocket";
import * as ws from "./components/Websocket.js"


import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

import ContainerExample from "./TestBS.js"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

import { SplitPane } from "react-collapse-pane";

import DisardTiles from './components/DiscardTiles.js';


const s = {color:"white", float:"left", display:"flex",  "flexDirection":"column", overflow:"scroll", "textAlign":"center", 
			border:"5px", borderColor:"black", borderStyle:"solid", height:"100%", width:"100%"};



function App3(params) {
	const e = ws.useConnectWS2();

	return (

		<SplitPane split="horizontal" collapse={true} >
			<div style={{...s}}>
				<Player2 direction="Left" wsEvent={e} />
				<Player2 direction="Top" wsEvent={e} />
				<Player2 direction="Right" wsEvent={e} />
				<Records.RoundRecords wsEvent={e} />
			</div>
			<div style={s}>



			<DisardTiles wsEvent={e} />
				

			
			</div>

		</SplitPane>

	);

}



export default App3;
