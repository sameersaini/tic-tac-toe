import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class moveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {},
        };
        this.handleClick = this.handleClick.bind(this);
        this.getRowCol = this.getRowCol.bind(this);
    }

    handleClick(event, step) {
        this.setState({ activeItem: { [event.target.id]: true } });
        this.props.jumpTo(step);
    }

    getRowCol(location) {
        if (location !== null) {
            return {
                0: { row: '1', col: '1' },
                1: { row: '1', col: '2' },
                2: { row: '1', col: '3' },
                3: { row: '2', col: '1' },
                4: { row: '2', col: '2' },
                5: { row: '2', col: '3' },
                6: { row: '3', col: '1' },
                7: { row: '3', col: '2' },
                8: { row: '3', col: '3' },
            }[location];
        }
        return { row: '', col: '' };
    }

    createList() {
        return this.props.history.map((move, step) => {
            const { row, col } = this.getRowCol(move.location);
            const text = step ? `Go to move # ${step} (R${row}, C${col})` : 'Restart game';
            return (
                <li style={{ width: '70%' }}
                    className={this.state.activeItem[step]
                        ? ' list-group-item list-group-item-action active'
                        : ' list-group-item list-group-item-action '}
                    key={step}
                    id={step}
                    onClick={event => this.handleClick(event, step)}
                >
                    {text}
                </li>
            );
        });
    }

    render() {
        return (
            <ol className="list-group">
                <ReactCSSTransitionGroup
                    transitionName="moveList"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                >
                    {this.createList()}
                </ReactCSSTransitionGroup>
            </ol>
        );
    }
}
