var goodctl = require("../controller/Goods.js");

module.exports = function(app) {
    app.post('/queryGoodsByCompanyId/:id', goodctl.queryGoodsByCompanyId);
    app.post('/queryGoodsByName/:gname/:companyid', goodctl.queryGoodsByName);
    app.get('/deleteGoods/:gid', goodctl.deleteGoods);
    app.get('/saveGoods/:gname/:gprice/:gdescrition/:gid_companies', goodctl.saveGoods);
    app.get('/detailGoods/:gid', goodctl.detailGoods);
    app.get('/updateGoods/:gname/:gprice/:gdescrition/:gid_companies/:gid', goodctl.updateGoods);
}