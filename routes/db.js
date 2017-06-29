var mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "company"
});

//-------------------------------------操作商场表部分
//查询全部
exports.queryAll = function(callback) {
    var sql = "select * from companies";
    mysqlConnection.query(sql, callback);
}

//条件查询
exports.queryByName = function(name, callback) {
    var sql = "select * from companies where name like '%" + name + "%'";
    mysqlConnection.query(sql, callback);
}

//添加数据
exports.save = function(companies, callback) {
    var insertSql = "insert into companies(name,address,regisNum) values(?,?,?)";
    var insertData = new Array();
    insertData[0] = companies.name;
    insertData[1] = companies.address;
    insertData[2] = companies.regisNum;
    mysqlConnection.query(insertSql, insertData, callback);
}

//删除数据
exports.delete = function(id, callback) {
    var sql = "delete from companies where id=" + id;
    mysqlConnection.query(sql, callback);
}

//回显数据
exports.detail = function(id, callback) {
    var sql = "select * from companies where id =" + id;
    mysqlConnection.query(sql, callback);
}

//修改数据
exports.update = function(companies, callback) {
    var sql = "update companies set name=?,address=?,regisNum=? where id=?";
    var data = [companies.name, companies.address, companies.regisNum, companies.id];
    mysqlConnection.query(sql, data, callback);
}

//-----------------------------------------------------操作商品表部分
exports.queryGoodsByCompanyId = function(id, callback) {
    var sql = "select gid,gname,gprice,gdescrition from companies c inner join goods g on c.id = g.gid_companies where c.id =" + id;
    mysqlConnection.query(sql, callback);
}

//条件查询
exports.queryGoodsByName = function(gname, companyid, callback) {
    var sql = "select g.gid,g.gname,g.gprice,g.gdescrition from goods g " +
        "inner join companies c " +
        "on g.gid_companies = c.id " +
        "where g.gname like '%" + gname + "%' and c.id=" + companyid;
    mysqlConnection.query(sql, callback);
}

//添加数据
exports.saveGoods = function(goods, callback) {
    var insertSql = "insert into goods(gname,gprice,gdescrition,gid_companies) values(?,?,?,?)";
    var insertData = new Array();
    insertData[0] = goods.gname;
    insertData[1] = goods.gprice;
    insertData[2] = goods.gdescrition;
    insertData[3] = goods.gid_companies;
    mysqlConnection.query(insertSql, insertData, callback);
}

//删除数据
exports.deleteGoods = function(gid, callback) {
    var sql = "delete from goods where gid=" + gid;
    mysqlConnection.query(sql, callback);
}

//回显数据
exports.detailGoods = function(gid, callback) {
    var sql = "select * from goods where gid =" + gid;
    mysqlConnection.query(sql, callback);
}

//修改数据
exports.updateGoods = function(goods, callback) {
    var sql = "update goods set gname=?,gprice=?,gdescrition=?,gid_companies=? where gid=?";
    var data = [goods.gname, goods.gprice, goods.gdescrition, goods.gid_companies, goods.gid];
    mysqlConnection.query(sql, data, callback);
}