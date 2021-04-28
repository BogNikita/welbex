const models = require('../model/Data');

exports.getData = (req, res, next) => {
  models.getData().then(([data]) => {
    res.json(data);
  });
};

exports.getDataOrderBy = (req, res, next) => {
  const orderby = req.query.param;
  models.getDataOrderBy(orderby).then(([data]) => {
    res.json(data);
  });
};

exports.getFiltredData = (req, res, next) => {
  const { option, condition, value, orderby = '' } = req.query;
  models.getFiltredData(option, condition, value, orderby).then(([data]) => {
    res.json(data);
  });
};
