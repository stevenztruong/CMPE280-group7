// import library
const lodash = require('lodash');

var developers = [
  { id : "123", firstName : "Phu", lastName : "Truong"},
  { id : "456", firstName : "Hoang", lastName : "Luong"},
  { id : "789", firstName : "Tuan", lastName : "Ung"},
  { id : "012", firstName : "Quang", lastName : "Pham"},
  { id : "345", firstName : "Nguyen", lastName : "Ngo"}
];

module.exports.getDevelopers = function(req, res) {
  res.json(developers);
};

module.exports.getDevelopersByID = function (req, res) {
  const developer = lodash.find(developers, ['id', req.swagger.params.id.value]);
  if(!developer) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
};

module.exports.getDevelopersByFName = function (req,res) {
  const developer = lodash.filter(developers, ['firstName', req.swagger.params.firstName.value]);
  if (!developer.length) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
}

module.exports.getDevelopersByLName = function (req,res) {
  const developer = lodash.filter(developers, ['lastName', req.swagger.params.lastName.value]);
  if (!developer.length) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
}

module.exports.addDeveloper = function (req, res) {
  const developer = lodash.find(developers, ['id', req.body.id]);
  if (developer) {
    res.statusCode = 409;
    return res.send('Error 409: Developer with this id already exists.');
  }
  const newDeveloper = {
    id : req.body.id,
    firstName : req.body.firstName,
    lastName : req.body.lastName
  };

  developers.push(newDeveloper);
  res.json('Successfully Posted!');
}

module.exports.deleteDeveloper = function (req, res) {
  const developerIdx = lodash.findIndex(developers, ['id', req.swagger.params.id.value]);
  if(developerIdx < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }

  developers.splice(developerIdx, 1);
  res.json('Successfully Deleted!');
}

module.exports.updateDeveloperByID = function (req ,res) {
  const developer = lodash.find(developers, ['id', req.swagger.params.id.value]);
  if(!developer) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
}
