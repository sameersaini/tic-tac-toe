import React, { Component } from 'react';
import Square from './square';


export default class Board extends Component {
    renderSquare(i, highlight) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            highlight={highlight}
        />;
    }

    renderBoard() {
        const { winningCombination } = this.props;
        const board = [];
        let cellNumber = 0;
        for (let i = 0; i < 3; i++) {
            const cells = [];
            for (let j = 0; j < 3; j++) {
                let highlight = false;
                if (winningCombination && winningCombination.indexOf(cellNumber) !== -1) {
                    highlight = true;
                }
                cells.push(this.renderSquare(cellNumber++, highlight));
            }
            board.push(<div key={i} className="board-row">{cells}</div>);
        }
        return board;
    }

    render() {
        return (
            <div >
                {this.renderBoard()}
            </div>
        );
    }
}
