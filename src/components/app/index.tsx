import React, { useEffect, useState } from "react";
import Header from "./header";
import styled from 'styled-components';
import Game from "./game";

export const NUM_POKEMON = 898;
export const NUM_OPTIONS = 4;
export const NUM_ROUNDS = 10;
export const TIME_LIMIT_QUESTION = 30; //5s time limit per question

const Styled = styled.div`
    text-align: center;
    margin: auto;
    
    .instructions {
        border: 5px solid black;
        margin: auto;
        font-size: 25px;
        margin-top: 100px;
        width: 500px;
        height: 80px;
        padding: 50px;
        border-radius: 10px;
    }
    .playButton {
        margin-top: 50px;
        width: 100px;
        height: 100px;
        color: white;
        background-color: purple;
        border-radius: 15px;
    }
`;

const App: React.FC = () => {
    const [highScore, setHighScore] = useState(0);
    const [playing, setIsPlaying] = useState(false);

    return (
        <Styled>
            <Header highScore={highScore} />
            {playing ?
                <Game highScore={highScore} setHighScore={setHighScore} endGame={() => setIsPlaying(false)} />
                : (
                    <>
                        <div className="instructions">Instructions: Click on the Pokemon that matches the picture! There are {NUM_ROUNDS} rounds, and you have {TIME_LIMIT_QUESTION} seconds to answer each question</div>
                        <button
                            className="playButton"
                            onClick={() => setIsPlaying(true)}>
                            Click to play
                        </button>
                    </>
                )}
        </Styled>
    );
};

export default App;
