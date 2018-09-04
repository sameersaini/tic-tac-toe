import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import './index.css';


// ========================================

ReactDOM.render(
    <div>
        <div className="container">
            <Game />
        </div>
        <footer className="footer" id="footer">
            <span className="text-muted"><i className="far fa-copyright" /> No copyright</span>
        </footer>
    </div>,
    document.getElementById('root')
);
