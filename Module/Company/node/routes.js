var Company = {};
Company.company = require('./routes/Company.js');

module.exports = function(app) {
    Company.company(app);
}