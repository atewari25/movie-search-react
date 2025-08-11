import { useState } from "react"
import "../css/game.css"

function GameCard(props){
    const [stage, setStage] = useState("");
    return <div>
        <button className="blue" onClick={() => setStage(props.color)}>
            My color is {stage}
        </button>
         <button className="red" onClick={() => setStage(props.color)}>
            My color is {stage}
        </button>
    </div>
}

export default GameCard