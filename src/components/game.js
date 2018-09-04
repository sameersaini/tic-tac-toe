import React, { Component } from 'react';
import Board from './board';
import MoveList from './moveList';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.CHAR_X = 'X';
        this.CHAR_O = 'O';

        this.state = {
            history: [{
                squares: new Array(9).fill(null),
                location: null,
            }],
            player: this.CHAR_X,
            stepNumber: 0,
        };

        this.handleClick = this.handleClick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    checkFull(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
                return false;
            }
        }
        return true;
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
                return {
                    player: squares[a],
                    combination: winningCombinations[i],
                };
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
                history: [...history, { squares, location: i }],
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

    render() {
        const { history } = this.state;
        const current = history[this.state.stepNumber];
        const winner = this.checkWinner(current.squares);
        const full = this.checkFull(current.squares);
        let winningCombination = null;

        let status = `Next player: ${this.state.player}`;
        let statusClass = 'text-primary';
        if (winner) {
            status = `Winner: ${winner.player}`;
            winningCombination = winner.combination;
            statusClass = 'text-success';
        }
        if (full && !winner) {
            status = 'It is a Draw';
            statusClass = 'text-danger';
        }

        return (
            <div>
                <div className="row">
                    <hr />
                    <h2 style={{ textAlign: 'center', marginTop: '10px' }}><u>Tic Tac Toe</u></h2>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 game">
                        <div className="col-sm-6 game-board">
                            <div className={statusClass}><h5 >{status}</h5></div>
                            <Board
                                squares={current.squares}
                                onClick={this.handleClick}
                                winningCombination={winningCombination}
                            />
                        </div>
                        <div className="col-sm-6 game-info">
                            <MoveList
                                history={this.state.history}
                                jumpTo={this.jumpTo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
