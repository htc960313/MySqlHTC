var companyctr = require("../controller/Company.js");

module.exports = function(app) {
    app.get('/', companyctr.queryAll);
    app.post('/queryByName/:name', companyctr.queryByName);
    app.get('/delete/:id', companyctr.delete);
    app.get('/save/:name/:address', companyctr.save);
    app.get('/detail/:id', companyctr.detail);
    app.get('/update/:id/:name/:address/:regisNum', companyctr.update);
}