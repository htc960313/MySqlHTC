var express = require('express');
var path = require('path');
var dao = require('../../../../routes/db');

//初始加载，查询该商城所有商品信息
exports.queryGoodsByCompanyId = function(req, res) {
    var id = req.params.id;
    dao.queryGoodsByCompanyId(id, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.render(path.resolve(__dirname, '../../web/view/goods/index'), { dataList: data, companyid: id, title: '商品详情页' });
        }
    })
}

//按名称模糊查询
exports.queryGoodsByName = function(req, res) {
    var gname = req.params.gname;
    if (gname == "null") {
        gname = "";
    }
    var companyid = req.params.companyid;

    dao.queryGoodsByName(gname, companyid, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.render(path.resolve(__dirname, '../../web/view/goods/index'), { dataList: data, title: '商品详情页' });
        }
    })
}

//根据id删除
exports.deleteGoods = function(req, res, next) {
    var gid = req.params.gid;
    dao.deleteGoods(gid, function(err, result) {
        if (err) {
            return next(result);
        } else {
            res.redirect('/');
        }
    })
}

//新增信息
exports.saveGoods = function(req, res, next) {
    var goods = {};
    goods.gname = req.params.gname;
    goods.gprice = req.params.gprice;
    goods.gdescrition = req.params.gdescrition;
    goods.gid_companies = req.params.gid_companies;

    dao.saveGoods(goods, function(err, result) {
        if (err) {
            return next(result);
        }
        res.redirect('/');
    })
}

//回显（根据id）
exports.detailGoods = function(req, res, next) {
    var gid = req.params.gid;
    dao.detailGoods(gid, function(err, r) {
        if (err) throw err;
        r[0].success = true;
        res.send(r[0]);
    })
}

//修改信息
exports.updateGoods = function(req, res, next) {
    var goods = { gname: req.params.gname, gprice: req.params.gprice, gdescrition: req.params.gdescrition, gid_companies: req.params.gid_companies, gid: req.params.gid };
    dao.updateGoods(goods, function(err, data) {
        if (err) {
            return next(result);
        } else {
            res.redirect('/');
        }
    })
}