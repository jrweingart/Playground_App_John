import React from "react";
import styled from "styled-components";

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    background-color: darkgreen;
    height: 100px;

    div {
        color: white;
        font-family: Montserrat;
        font-size: 30px;
        padding: 30px;
    }
`;

const Header: React.FC<{highScore: number}> = ({highScore}) => {
    return (
        <Styled>
            <div className="header">Welcome to PokeGuess!</div>
            <div>High Score: {highScore}</div>
        </Styled>
    );
}

export default Header;
