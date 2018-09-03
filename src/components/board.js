import React, { Component } from 'react';
import Square from './square';


export default class Board extends Component {
    renderSquare(i) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div >
                <div className="status"><h5 >{this.props.status}</h5></div>
                <div className="board-row">
                    {[0, 1, 2].map(number => this.renderSquare(number))}
                </div>
                <div className="board-row">
                    {[3, 4, 5].map(number => this.renderSquare(number))}
                </div>
                <div className="board-row">
                    {[6, 7, 8].map(number => this.renderSquare(number))}
                </div>
            </div>
        );
    }
}
