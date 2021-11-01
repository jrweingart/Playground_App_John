import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Styled = styled.h1`
    text-align: center;
    margin-top: auto;
    font-size: 50px;
`;

// enter time limit in ms, counts up to that time.
const Counter: React.FC<{time: number; hitLimit: () => void; limit: number; setTime: React.Dispatch<React.SetStateAction<number>>}> = ({time, setTime, limit, hitLimit}) => {    
    const ref = useRef<NodeJS.Timeout>();
      
    useEffect(() => {
        ref.current = setInterval(() => {
            setTime(c => c - 0.1);
        }, 100);

        return () => {
            clearInterval(ref.current!);
        };
    }, [ ref, setTime ]);

    useEffect(() => {
        if(time <= 0) {
            setTime(limit);
            hitLimit();
        }
    }, [time]);

    return (
        <Styled>
            Time Remaining: { Math.ceil(time * 10) / 10 }
        </Styled>
    );
};

export default Counter
