"use strict";

//rollup App.js --file ../bundle.js --format iife

var _store = require("./store/store.js");

var _router = require("./router/router.js");

Vue.config.devtools = true;
Vue.use(Vuex);
Vue.use(VueRouter);
new Vue({
  el: '#app',
  vuetify: new Vuetify({}),
  store: _store.store,
  router: _router.router,
  beforeCreate: function beforeCreate() {
    this.$store.commit('initialiseStore');
  }
});