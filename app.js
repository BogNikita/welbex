const express = require('express');
const router = require('./routers');
const initdb = require('./model/initdb');

initdb();

const app = express();
app.use(express.static(__dirname + '/client/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(5000, () => {
  console.log('Server listening on localhost 5000');
});
