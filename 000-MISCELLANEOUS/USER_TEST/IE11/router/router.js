"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _Home = require("../modules/home/Home.js");

var _Table = require("../modules/single-table/Table.js");

var _Tables = require("../modules/multiple-tables/Tables.js");

var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: _Home.Home
  }, {
    path: '/single',
    name: 'table',
    component: _Table.SingleTable
  }, {
    path: '/multiple',
    name: 'tables',
    component: _Tables.MultipleTable
  }]
});
exports.router = router;