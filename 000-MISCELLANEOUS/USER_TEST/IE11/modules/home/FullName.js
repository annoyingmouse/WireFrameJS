"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FullName = void 0;
var FullName = Vue.component("full-name", {
  functional: true,
  render: function render(createElement, context) {
    var item = context.props.item;
    return createElement(
      "span",
      ""
        .concat(item.title, " ")
        .concat(item.forename, " ")
        .concat(item.surname),
    );
  },
});
exports.FullName = FullName;
