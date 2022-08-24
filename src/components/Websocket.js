import React from 'react';

//if (this.ws === undefined || (this.ws && this.ws.readyState === 3)) {

//export let ws = new WebSocket(`wss://localhost:12121/ws`);
import events from "events"



export function useConnectWS2() {
    //const [msg, setMsg] = React.useState("");
    const [e] = React.useState(new events.EventEmitter());
    
    

    React.useEffect(() => {
        const ws = new WebSocket(`wss://localhost:12121/ws`);
        ws.onopen = () => {
            ws.send("readStreamOnly");
            console.log("connected to the server");

        };

        ws.onerror = () => {
            console.log("failed: ws error")
            ws.close();
            //return ws.close;
        }

        ws.onmessage = (data) => {
            //console.log("msg rec:", count2);
            e.emit("receiveData", data)
            
        }

        //ws.close.bind(ws);
        //return ws.close.bind(ws);
        return () => {
            ws.close.bind(ws);
            e.removeAllListeners();
            console.log("useConnectWS cleaned up")
        }


        //return ()=>{ws.close()};
        
    }, []);
    //return msg;
    return e;
}





export function useTestConnectWS() {
    //const [msg, setMsg] = React.useState("");
    const [e] = React.useState(new events.EventEmitter());
    
    

    React.useEffect(() => {
        const ws = new WebSocket(`ws://localhost:1323/ws`);
        ws.onopen = () => {
            console.log("connected to the Test server")
            ws.send("hello bitches")
        
        };

        ws.onerror = () => {
            console.log("failed: Test ws error ")
            ws.close();
            //return ws.close;
        }

        ws.onmessage = (data) => {
            //console.log("msg rec:", count2);
            e.emit("receiveData", data)
            
        }

        //ws.close.bind(ws);
        //return ws.close.bind(ws);
        return () => {
            ws.close.bind(ws);
            e.removeAllListeners();
            console.log("useConnectWS cleaned up")
        }


        //return ()=>{ws.close()};
        
    }, []);
    //return msg;
    return e;
}


