import React, {useEffect, useState, useRef} from "react";
import useStore from "../store/main";
import http from '../plugins/https'



const IndexPage = ({socket}) => {

    const {user} = useStore((state) => state);

    const [figures, setFigures] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        http.get("http://localhost:8001")
            .then(res => {
                if (res.success) {
                    setFigures(res.items)
                }
            })
    }, [])


    useEffect(() => {


    }, [])


    function start() {
        console.log(selected)
    }




    return (
        <div className='d-flex m-2 flex-column align-items-center gap-2'>
            <div className='d-flex justify-content-center gap-2'>
                {figures.map((x,i) =>
                    <div onClick={() => setSelected(x.image)}
                         style={{backgroundColor: selected === x.image? "lightgreen":""}}
                         className='fs-50 cursor-point border'
                         key={i}>
                        {x.image}
                    </div>)}
            </div>
            <div>
                <button onClick={start}>START GAME</button>
            </div>
        </div>
    )
};

export default IndexPage;