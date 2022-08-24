import './Player.css';
import React from 'react';
import * as ws from "./Websocket"

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.direction = props.direction;

        this.translation = { "top": "對家", "left": "下家", right: "上家" }
    }


    render() {
        let tmp = this.props.tiles;
        //console.log(tmp);

        return (
            <div className={"Player " + this.props.direction}>
                {this.translation[this.direction]}:&nbsp;{tmp.length != 0 && tmp.map((tile, i) => <img src={require(`../img/${tile.toLowerCase()}.png`)} key={i}></img>)}
            </div>
        );
    }

}


const translation = { "Top": "對家", "Left": "上家", "Right": "下家" };

const tmpFunc = (data, setMsg) => {

    try {
        data = JSON.parse(data.data)
        //console.log(data)

        data = JSON.parse(data)
    } catch {

    }

    if (data.type_ === 0) {
        setMsg(data);
    }
};


export function Player2(props) {

    //const msg = ws.useConnectWS(tmpFunc);
    const [msg, setMsg] = React.useState("");

    const [eventCallback] = React.useState(()=>(data)=>{
        try {
            data = JSON.parse(data.data)
            //console.log(data)
    
            data = JSON.parse(data)
        } catch {
    
        }

        if (data.type_ === 0)
            setMsg(data);
    });
    //console.log(props.wsEvent);
    React.useEffect(()=>{
        props.wsEvent.on("receiveData", eventCallback)
        return () => props.wsEvent.removeListener("receiveData", eventCallback);
    },[props.wsEvent])
    //console.log(msg)
    let tmp = msg[props.direction] ? msg[props.direction] : "" ;

    
    return (
        <div className={"Player " + props.direction}>
            {translation[props.direction]}:&nbsp;{tmp.length != 0 && 
            tmp.map((item, i) => {
                return !item.Skip ? <img src={require(`../img/${item.Tile.toLowerCase()}.png`)} key={i}></img> : 
                <img src={require(`../img/${item.Tile.toLowerCase()}.png`)} key={i} style={{display:"block", background:"#000", opacity:".4"}}></img>;
            })}
        </div>
    );
    
    /*
    return(
        <div className={"Player " + props.direction}>
            {translation[props.direction]}:&nbsp;{tmp.length != 0 && 
            tmp.map((item, i) => {
                 <img src={require(`../img/${item.Tile.toLowerCase()}.png`)} key={i+666}></img>;
            })}
        </div>
    );
    */

}


export default Player;