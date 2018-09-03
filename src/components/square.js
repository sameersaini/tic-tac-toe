import React from 'react';

export default function Square(props) {
    return (
        <button
            className={props.highlight ? 'highlight square' : 'square'}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}
