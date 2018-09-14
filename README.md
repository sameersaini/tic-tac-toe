# Tic-Tac-Toe

Features of game:

1. History of all the moves played by the users
2. Display the location for each move in the format (col, row) in the move history list.
3. Bold the currently selected item in the history list.
4. When someone wins, highlight the three squares that caused the win.
5. When no one wins, display a message about the result being a draw.


### Getting Started

Checkout the repo, install dependencies, then start the server with following:

```
> npm i
> npm run dev
```

Open browser -> [click here](http://localhost:3000)

### To Create a production build

```
> npm i
> npm run build
> npm start
```

By default, react create apps will build map files also. These map files maps the entire source code and entire original code is 
visible to the client on source inspect in the browser. Ideally, in a production env , only mified files should be visible to the 
client. So, to achieve this, I have changed the build script in the package.json file to removed the map files after build creation.

##### package.json
```json
{ "build": "react-scripts build && rm build/static/js/*.map && rm build/static/css/*.map" }
```

By doing so, only bundled js and css files are visible to the end user in a production env.

Open browser -> [click here](http://localhost:5000)