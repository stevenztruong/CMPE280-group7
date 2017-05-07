// import library
const bodyParser = require('body-parser');
const lodash = require('lodash');

var developers = [
  { id : "123", firstName : "Phu", lastName : "Truong"},
  { id : "456", firstName : "Hoang", lastName : "Luong"},
  { id : "789", firstName : "Tuan", lastName : "Ung"},
  { id : "012", firstName : "Quang", lastName : "Pham"},
  { id : "345", firstName : "Nguyen", lastName : "Ngo"}
];

module.exports.getDevelopers = function(req, res) {
  if (req.query.firstName) {
    getDevelopersByFName(req, res);
    return;
  }
  res.json(developers);
};

module.exports.getDevelopersByID = function (req, res) {
  const developer = lodash.find(developers, ['id', req.params.id]);
  if(!developer) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
};

const getDevelopersByFName = function (req,res) {
  const developer = lodash.find(developers, ['firstName', req.query.firstName]);
  if (!developer) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  res.json(developer);
}

// module.exports.getDevelopersByLName = function (req,res) {
//   const developer = lodash.find(developers, ['lastName', req.params.lastName]);
//   if (!developer) {
//     res.statusCode = 404;
//     return res.send('Error 404: No developer found');
//   }
//   res.json(developer);
// }

module.exports.addDeveloper = function (req, res) {
  if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('lastName')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
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
  const developerIdx = lodash.findIndex(developers, ['id', req.params.id]);
  if(developerIdx < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }

  developers.splice(developerIdx, 1);
  res.json('Successfully Deleted!');
}

module.exports.updateDeveloperByID = function (req ,res) {
  const developer = lodash.find(developers, ['id', req.params.id]);
  if(!developer) {
    res.statusCode = 404;
    return res.send('Error 404: No developer found');
  }
  // Only set first name and last name if they are not empty
  if (req.body.firstName) {
    developer.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    developer.lastName = req.body.lastName;
  }

  res.json(developer);
}
