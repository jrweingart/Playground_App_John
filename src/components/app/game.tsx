import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { IPokemonGetResponse } from "./types";
import styled from 'styled-components';
import Counter from "./counter";
import { NUM_OPTIONS, NUM_ROUNDS, TIME_LIMIT_QUESTION, NUM_POKEMON } from "./index";


const Styled = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: auto;

    .counterAndScore {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 50px;
        height: 50px;

        div {
            margin-right: 40px;
            font-size: 50px;
        }
    }

    .mainImage {
        img {
            width: 200px;
            height: auto;
        }
    }
`;

const PokeButton = styled.button`
    background-color: purple;
    color: white;
    border-radius: 6px;
    width: 400px;
    height: 50px;
    margin: auto;
    margin-bottom: 20px;
`;

const PokeList: React.FC<{onClick: (name: string) => void, names: string[]}> = ({names, onClick}) => {
    return (
        <>  
            {names.map((name) => {
                return (
                    <PokeButton onClick={() => onClick(name)}>{name}</PokeButton>
                );
            })}
        </>
    );
};

const Game: React.FC<{
    highScore: number; 
    setHighScore: (score: number) => void; 
    endGame: () => void;
}> = ({highScore, setHighScore, endGame}) => {
    const [correctPoke, setCorrectPoke] = useState("");
    const [picture, setPicture] = useState("");
    const [allPokes, setAllPokes] = useState<string[]>([]);
    const [countRounds, setCountRounds] = useState(1);
    const [correct, setCorrect] = useState(0);
    const [ time, setTime ] = useState(TIME_LIMIT_QUESTION);
    const [isLoading, setIsLoading] = useState(false);

    const onClickPokeButton = (name: string) => {
        if (name === correctPoke) {
            setCorrect(correct + 1);
        }
        setCountRounds(countRounds + 1);
        setTime(TIME_LIMIT_QUESTION);
    };

    const getRandomNumbers = () => {
        let setNums = new Set();

        while(setNums.size < NUM_OPTIONS) {
            setNums.add(Math.ceil(Math.random() * NUM_POKEMON));
        }
        return setNums;
    };

    const generatePokemon = async () => {
        const allNums = getRandomNumbers();
        var it = allNums.values();
    
        setIsLoading(true);

        const { data } = await axios.get<IPokemonGetResponse, IPokemonGetResponse>(`https://pokeapi.co/api/v2/pokemon/${it.next().value}`);
        const { sprites, name } = data;

        setCorrectPoke(name);
        setPicture(sprites?.front_default);
        setAllPokes([]);

        for (var val= null; val=it.next().value; ) {
            const { data } = await axios.get<IPokemonGetResponse, IPokemonGetResponse>(`https://pokeapi.co/api/v2/pokemon/${val}`);
            setAllPokes((prevState) => ([data?.name, ...prevState]));
        }
        const randLocation = Math.floor(Math.random() * NUM_OPTIONS); //get random location for correct poke
        setAllPokes((prevState) => ([...prevState.slice(0, randLocation), name, ...prevState.slice(randLocation)]))
        setIsLoading(false);
    };

    useEffect(() => {
        if(countRounds > NUM_ROUNDS) {
            if (correct > highScore) {
                setHighScore(correct);
            }
            endGame();
        }
        else {
            generatePokemon();
        }
    }, [countRounds]);

    return (
        <Styled>
            <div className="counterAndScore">
                <div>Round: {countRounds}</div>
                {isLoading || <Counter setTime={setTime} hitLimit={() => onClickPokeButton(" ")} time={time} limit={TIME_LIMIT_QUESTION}/>}
                <div>Score: {correct} / {countRounds - 1}</div>
            </div>
            <h1> What is the name of this pokemon? </h1>
            <div className="mainImage">
                <img src={picture}></img>
            </div>
            {isLoading || <PokeList onClick={onClickPokeButton} names={allPokes}/>}
        </Styled>
    );
};

export default Game;
