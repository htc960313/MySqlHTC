var Goods = {};
Goods.goods = require('./routes/Goods.js');

module.exports = function(app) {
    Goods.goods(app);
}