var express = require('express');
var path = require('path');
var dao = require('../../../../routes/db');

//初始加载，查询所有
exports.queryAll = function(req, res) {
    dao.queryAll(function(err, data) {
        res.render(path.resolve(__dirname, '../../web/view/company/new_index'), { dataList: data, title: '首页' });
    })
}

//按名称模糊查询
exports.queryByName = function(req, res) {
    var name = req.params.name;
    if (name == "null") {
        name = "";
    }
    dao.queryByName(name, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.render(path.resolve(__dirname, '../../web/view/company/index'), { dataList: data, title: '首页' });
        }
    })
}

//根据id删除
exports.delete = function(req, res, next) {
    var id = req.params.id;
    dao.delete(id, function(err, result) {
        if (err) {
            return next(result);
        } else {
            res.redirect('/');
        }
    })
}

//新增信息
var suiji = 0;
exports.save = function(req, res, next) {
    suiji++;
    var company = {};
    company.name = req.params.name;
    company.address = req.params.address;
    // var suiji = Math.floor(Math.random() * 1000);
    if (suiji < 100 && suiji >= 10) { suiji = "0" + suiji; } else if (suiji < 10) { suiji = "00" + suiji; }
    var date = new Date();
    var perentDay = date.getFullYear() + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    company.regisNum = perentDay + suiji;
    dao.save(company, function(err, result) {
        if (err) {
            return next(result);
        }
        res.redirect('/');
    })
}

//回显（根据id）
exports.detail = function(req, res, next) {
    var id = req.params.id;
    dao.detail(id, function(err, r) {
        if (err) throw err;
        r[0].success = true;
        res.send(r[0]);
    })
}

//修改信息
exports.update = function(req, res, next) {
    var company = { name: req.params.name, address: req.params.address, regisNum: req.params.regisNum, id: req.params.id };
    dao.update(company, function(err, data) {
        if (err) {
            return next(result);
        } else {
            res.redirect('/');
        }
    })
}