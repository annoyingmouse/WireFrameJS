"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutYou = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AboutYou = Vue.component('about-you', {
  template: "\n    <v-card class=\"mb-3\">\n      <v-card-title class=\"primary white--text mb-2\">\n        <h3>\n          About you\n        </h3>\n      </v-card-title>\n      <v-card-text>\n        <v-select v-model=\"title\"\n                  v-bind:items=\"titles\"\n                  v-bind:rules=\"[v => !!v || 'Title is required']\"\n                  label=\"Your title\"\n                  required>\n        </v-select>\n        <v-text-field v-model=\"forename\"\n                      v-bind:rules=\"[v => !!v || 'Forename is required']\"\n                      label=\"Your forename\"\n                      required>\n        </v-text-field>\n        <v-text-field v-model=\"surname\"\n                      v-bind:rules=\"[v => !!v || 'Surname is required']\"\n                      label=\"Your surname\"\n                      required>\n        </v-text-field>\n        <v-menu ref=\"menu\"\n                v-model=\"menu\"\n                v-bind:close-on-content-click=\"false\"\n                v-bind:return-value.sync=\"dob\"\n                transition=\"scale-transition\"\n                offset-y\n                min-width=\"290px\">\n          <template v-slot:activator=\"{ on }\">\n            <v-text-field v-model=\"dob\"\n                          label=\"Date of birth\"\n                          v-bind:rules=\"[v => !!v || 'Date of birth is required']\"\n                          v-on=\"on\">\n            </v-text-field>\n          </template>\n          <v-date-picker v-model=\"dob\">\n            <v-spacer></v-spacer>\n            <v-btn text color=\"primary\" @click=\"menu = false\">Cancel</v-btn>\n            <v-btn text color=\"primary\" @click=\"$refs.menu.save(dob)\">OK</v-btn>\n          </v-date-picker>\n        </v-menu>\n      </v-card-text>\n    </v-card>\n  ",
  data: function data() {
    return {
      menu: false
    };
  },
  computed: _objectSpread({
    title: {
      get: function get() {
        return this.$store.state.family[0].title;
      },
      set: function set(value) {
        this.$store.commit('update', {
          attribute: 'title',
          value: value
        });
      }
    },
    forename: {
      get: function get() {
        return this.$store.state.family[0].forename;
      },
      set: function set(value) {
        this.$store.commit('update', {
          attribute: 'forename',
          value: value
        });
      }
    },
    surname: {
      get: function get() {
        return this.$store.state.family[0].surname;
      },
      set: function set(value) {
        this.$store.commit('update', {
          attribute: 'surname',
          value: value
        });
      }
    },
    dob: {
      get: function get() {
        return this.$store.state.family[0].dob;
      },
      set: function set(value) {
        this.$store.commit('update', {
          attribute: 'dob',
          value: value
        });
      }
    }
  }, Vuex.mapState(['titles']))
});

exports.AboutYou = AboutYou;