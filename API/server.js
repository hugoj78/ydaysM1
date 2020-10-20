/*
NOTE COUR

- configs
  - configs DB
  - configs JWT
  - configs server
- controllers
- models
- routes (definition des end points)
- services
  - DB
  - server
- utilities
  - midlleware: veirfyToken
*/

// Require
const app = require('./src/services/express.service');
const db = require('./src/services/mongoose.service');

// Express service
app.start();

// DB service
db.connect();
