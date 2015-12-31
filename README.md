## webpack-react

A ClassManager developed by:
React.js, Express, Mongodb, node.js, webpack, grunt

##Build

1. Run `npm install` to install the dependencies for the frontend.
2. `cd express` Go to the directory `express` Run `npm install` again to install the dependencies for the backend.
3. develop mode: `cd ..` come back to the root directory Run `npm start` and visit `http://localhost:8080` (make sure port 8080 and 3000 are not taken, because the nodejs will run in port 3000 and the webpack server will run in port 8080)
4. product mode: `cd ..` come back to the root directory Run `npm run deploy` and then `cd express` go to the directory `express` run `npm start` and then visit `http://localhost:3000` (make sure port 3000 is not taken) 
