const mongoose = require('mongoose');
const config = require('../configs/db.config');

exports.connect = () => {
  let url = config.url;
  mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    }
  ).then(
    () => {
      console.log('Successfully connect to database');
    }
  ).catch(
    err => {
      console.log('could not connect to databse', err);
      process.exit(-1);
    }
  )
}
