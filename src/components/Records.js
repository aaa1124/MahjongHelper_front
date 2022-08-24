import React from 'react';
import * as ws from "./Websocket.js"

import './Records.css';
import Button from 'react-bootstrap/Button';


const itemParsing = (data) => {
    let Comb1 = <><span style={{color:"red"}}>{data["WaitsCount"]}</span>[{data?.AvgImproveWaitsCount?.toFixed(2)}] </>;
    //Meld, 碰，上
    //let Comb2 = <>{data["Meld"] && <>{("" + data["Meld"])?.replace(",", "")}</>}</>;
    let Comb2 = <>{data["Meld"] &&  [data["Meld"][0], ...data["Meld"].slice(1).map(val => <img src={require(`../img/${val.toLowerCase()}.png`)} ></img> ) ] }</>;

    //let Comb3 = <>切{data.TileZH}</>;
    let Comb3 = data.TileZH ? <>切<img src ={require(`../img/${data.TileZH.toLowerCase()}.png`)}></img></> : "";

    let Comb4 = <><span style={{color:"teal"}}>{data?.AvgNextShantenWaitsCount?.toFixed(2)}</span>{data.IncShanten}</>;

    //和率
    let Comb5 = <>{data.AvgAgariRate > 0 && <> 參考和率：{data.AvgAgariRate?.toFixed(2)}%, </>}</>;

    let Comb5a = <>{data.MixedWaitsScore > 0 && <>&nbsp;[{data.MixedWaitsScore.toFixed(2)}速度]</>}</>;
    //役種
    let Comb6 = <><span style={{color:"green"}}>{data.YakuTypes}</span>{data.IsPartWait}</>;
    let record = (<span>
        {Comb1}{Comb2} , {Comb3} => {Comb4}{Comb5}{Comb5a} {Comb6}

    </span>);

    return record;
}



export function RoundRecords(props) {

    const [records, setRecords] = React.useState([]);
    const [recordsIndex, setRI] = React.useState(-1);
    const [msg, setMsg] = React.useState("");

    const [eventCallback] = React.useState(()=>(data)=>{
        try {
            data = JSON.parse(data.data);
            //console.log(data)
    
            data = JSON.parse(data);
        } catch (e) {
            //console.log(e);
        }

        if (data.Type_ === 1 || data.Type_ === 2)
            setMsg(data);
    });

    //let a = 555;



    //const msg = ws.useConnectWS(tmpFunc);

    //let msg = "";
    React.useEffect(()=>{
        props.wsEvent.on("receiveData", eventCallback);
        return () => props.wsEvent.removeListener("receiveData", eventCallback);
    },[props.wsEvent])

    React.useEffect(() => {
        //console.log(props.recordsIndex);
        try {


            if (msg) {
                let r = [];
                let debug1;
                try {

                    for (const i of msg.Data) {
                        debug1 = i;
                        let d = JSON.parse(i);
                        r.push(d.Shanten)
                        r.push(<br></br>)

                        for (const i2 of d.Items) {

                            //console.log(i2)
                            //console.log(typeof(i2))
                            let d2 = JSON.parse(i2)

                            r.push(itemParsing(d2))
                            r.push(<br></br>)
                        }




                    }
                    r = r.map((val, i) => <React.Fragment key={i}>{val}</React.Fragment>)
                } catch (e) {
                    console.log(e)
                    //console.log(typeof(props.newRecord.Data))
                    console.log(typeof (debug1));
                    console.log(debug1);
                    console.log(debug1.length);
                    console.log(msg);
                }


                //records.push(r);
                setRecords([...records, r]);
                setRI(records.length);

            }
        } catch (e) {
            console.log(e);
        }

    }

        , [msg]);



    return (<><div className='records'>{records?.[recordsIndex]}</div>
        <div>
            <Button variant="success" onClick={() => recordsIndex > 0 && setRI(recordsIndex - 1)} >Previous Page</Button>
            {recordsIndex}
            <Button variant="success" onClick={() => ((recordsIndex < records.length - 1) && records.length > 0) && setRI(recordsIndex + 1)} >Next Page</Button>

        </div></>);
}

