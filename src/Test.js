

import React from 'react';


function TextOverflowTest(params) {
    let style = { border: "1px", "borderStyle": "solid", "borderColor": "green" }
    let tmp = ["wtf"]
    for (let index = 0; index < 100000; index++) {
        tmp.push("a")

    }
    return (<div style={style} className={"textTest"}>
        {tmp}
    </div>);

}


export class Test1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wtf: 0 };
    }

    render() {
        console.log(this.state.wtf)
        return (<div><button onClick={() => { this.setState({ "wtf": this.state.wtf + 1 }) }}>Test2</button>
        </div>);
    }

}

export function Test2(props) {
    let [wtf, setWTf] = React.useState(0)
    console.log(wtf);
    //setWTf(wtf+1);
    return (
        <div>
            <button onClick={() => setWTf(wtf + 1)}>Test3</button>
            <button onClick={() => { wtf++; console.log(wtf) }}>Test3.1</button>
            {wtf}
        </div>);


}



export function FUCK(props) {
    let [state, setState] = React.useState({});

    console.log("wtf2")
    React.useEffect(() => {
        //console.log("wtfffff")
        //state.x = 1;
        state.x = 1
        //console.log(props.func)
        let interval = setInterval(() => {
            state.x += 1;
            console.log(state, "wtf")
            //setState({...state});
        }, 3000);

        return () => clearInterval(interval);
    }, [props.func])
    return <>{state.x}</>
}
export function Fuck2(props) {
    const [x, setX] = React.useState("");
    let a = "sup";


    React.useEffect(()=>{
        props.e.on("debug", (data) => {
            setX(data)
            a = data;

        });

    },[])
    return <>{x}</>;
}

export function test1(props) {

}
