import React, { Component } from 'react';
import Board from './board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.CHAR_X = 'X';
        this.CHAR_O = 'O';

        this.state = {
            history: [{
                squares: new Array(9).fill(null),
            }],
            player: this.CHAR_X,
            stepNumber: 0,
        };

        this.handleClick = this.handleClick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    checkWinner(squares) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.checkWinner(squares)) {
            return;
        }

        if (squares[i] === null) {
            squares[i] = this.state.player;
            const player = this.state.player === this.CHAR_X ? this.CHAR_O : this.CHAR_X;

            this.setState({
                history: [...history, { squares }],
                player,
                stepNumber: history.length,
            });
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            player: (step % 2) === 0 ? 'X' : 'O',
        });
    }

    createMoves(history) {
        return history.map((move, step) => {
            const text = step ? `Go to move # ${step}` : 'Restart game';

            return (
                <li style={{ width: '50%' }}
                    className="list-group-item list-group-item-action"
                    key={step}
                    onClick={() => this.jumpTo(step)}
                >
                    {text}
                </li>
            );
        });
    }

    render() {
        const moves = this.createMoves(this.state.history);
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.checkWinner(current.squares);

        let status = `Next player: ${this.state.player}`;
        if (winner) {
            status = `Winner: ${winner}`;
        }

        return (
            <div>
                <div className="row">
                    <hr />
                    <h2 style={{ textAlign: 'center' }}><u>Tic Tac Toe</u></h2>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 game">
                        <div className="col-sm-6 game-board">
                            <Board
                                squares={current.squares}
                                onClick={this.handleClick}
                                status={status}
                            />
                        </div>
                        <div className="col-sm-6 game-info">
                            <ol className="list-group" >{moves}</ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
