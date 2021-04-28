const db = require('./db');
const config = require('../config');
const fs = require('fs');

const TableData = {
  async init() {
    if (config.db.cleanOnStatup) {
      await db.execute('drop table if exists table_data');
    }

    await db.execute(`
        CREATE TABLE table_data (
            id int NOT NULL AUTO_INCREMENT,
            date varchar(255) NOT NULL,
            name varchar(255) DEFAULT NULL,
            count tinyint DEFAULT '0',
            distance tinyint DEFAULT '0',
            PRIMARY KEY (id),
            UNIQUE KEY id_UNIQUE (id)
          );
          `);

    if (config.db.loadMockupData) {
      const mockups = JSON.parse(fs.readFileSync('./model/mockups/data.json', 'utf8'));
      mockups.forEach(async (mockups) => {
        await TableData.createElement(mockups);
      });
    }
  },

  async getData() {
    const data = await db.query('select * from table_data');
    return data;
  },

  async createElement(elem) {
    const newElement = await db.query('insert into table_data values(default, ?, ?, ?, ?)', [
      elem.date,
      elem.name,
      elem.count,
      elem.distance,
    ]);
    return newElement;
  },

  async getDataOrderBy(orderby) {
    const data = await db.query(`select * from table_data order by ${orderby}`);
    return data;
  },

  async getFiltredData(option, condition, value, orderby) {
    const data = await db.query(
      `select * from table_data WHERE ?? ${condition} ? ${orderby ? 'order by ' + orderby : ''}`,
      [option, condition === 'LIKE' ? `%${value}%` : value],
    );
    return data;
  },
};

module.exports = TableData;
