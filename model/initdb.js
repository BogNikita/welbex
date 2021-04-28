const Data = require('./Data');

module.exports = async function initDB() {
  await Data.init();
  console.log('db initilization');
};
