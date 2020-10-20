const express = require('express');
const config = require('../configs/server.config.js');
const bodyParser = require('body-parser');
const apiRouter = require('../routes');
const cors = require('cors');

// Start express
const app = express();

// Middleware
app.use(bodyParser.json());

// CORS block
app.use(cors());

// routes
app.use('/api/v1', apiRouter);

exports.start = () => {
  let port = config.port;

  app.listen(port, (err) => {
    if(err) {
      console.log(`Error:${err}`);
      //console.log('Error: ',port);
      //console.log('Error: '.err);
      process.exit(-1);
    }
    console.log(`app is running on port ${port}`);
  })
}
