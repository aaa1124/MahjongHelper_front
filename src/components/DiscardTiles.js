
import { Button } from "bootstrap";
import React from "react"



function loadImgs() {
    let images = {};
    let r = require.context("../img", false)
    r.keys().map(item => { images[item.replace('./', '')] = r(item); })
    return images
}

const rawImgs = loadImgs()

function f2(tile, leftcounts) {
    let r;
    //let style = { "height": "60px", width: "40px", padding: '5px' };
    let x = {};
    switch (leftcounts) {
        case 4:
            
           // x = {filter:"brightness(75%)",  border: "red 3px solid"}
            break;

        case 3:
            x =  {filter:"brightness(75%)",  border: "yellow 2px solid"}
            break;

        case 2:
            x = {filter:"brightness(50%)",  border: "orange 3px solid"}

            break;
        
        case 1:
            x = {filter:"brightness(25%)",  border: "red 3px solid"}
            break;
        
        case 0:
            x = {filter:"brightness(0%)",  border: "black 2px solid"}
            break;
    
        default:
            break;
    }
    let style = {"height": "60px", width: "40px", padding: '5px', ...x}
    r = <img src={rawImgs[tile + ".png"]} style={style} key={tile}></img>;
    return r;
}

function tmpFunc(allTilesLeftCounts) {
    let r = [];

    for (const iterator of ["m", "p", "s"]) {

        for (let index = 1; index < 10; index++) {
            r.push(f2(""+index+iterator , allTilesLeftCounts?.["" + index + iterator]))


        }
        r.push(<br key={iterator + "br"}></br>)

    }
    for (let index = 1; index < 8; index++) {
        r.push(f2(""+index+"z", allTilesLeftCounts?.["" + index + "z"]))

    }
    return r;
}



function DisardTiles({wsEvent}) {
    const [leftCounts, setLC] = React.useState({});
    const [r, setR] = React.useState(tmpFunc);

    const [eventCallback] = React.useState(()=>(data)=>{
        try {
            data = JSON.parse(data.data)
            //console.log(data)
    
            data = JSON.parse(data)
        } catch {
    
        }

        if (data.Type === 3){

            setLC(data.Data);
        }
        

    });

    React.useEffect(()=>{
        wsEvent.on("receiveData", eventCallback);
        return () => wsEvent.removeListener("receiveData", eventCallback);
    },[wsEvent])

    React.useEffect(()=>{
        setR(tmpFunc(leftCounts));
    },[leftCounts]);


    

    return (
        <div style={{ width: "100%", border: "5px solid black" }}>
            {r}


        </div>);
}


export default DisardTiles;

