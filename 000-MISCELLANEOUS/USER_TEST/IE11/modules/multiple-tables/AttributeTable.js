"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeTable = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AttributeTable = Vue.component('attribute-table', {
  template: "\n    <v-data-table v-bind:headers=\"headers\"\n                  v-bind:items=\"family.filter(f => f.multiple[type])\"\n                  v-bind:items-per-page=\"5\"\n                  class=\"mb-3 elevation-1\">\n      <template v-slot:top>\n        <v-toolbar flat color=\"primary white--text\">\n          <v-toolbar-title>\n            <h3>{{tableTitle}}</h3>\n          </v-toolbar-title>\n          <v-spacer></v-spacer>\n          <v-dialog v-model=\"dialog\" \n                    max-width=\"500px\">\n            <template v-slot:activator=\"{ on }\">\n              <v-btn color=\"secondary\" \n                     dark \n                     class=\"mb-2\" \n                     v-on=\"on\">\n                {{newButton}}\n              </v-btn>\n            </template>\n            <v-card>\n              <v-card-title>\n                <span class=\"headline\">{{modalHeadline}}</span>\n              </v-card-title>\n              <v-card-text>\n                <v-container>\n                  <v-form ref=\"form\">\n                    <v-select v-model=\"member\"\n                              v-bind:items=\"member ? [member] : family.filter(f => !f.multiple[type])\"\n                              v-bind:rules=\"[v => !!v || 'Item is required']\"\n                              item-text=\"full_name\"\n                              label=\"Family member\"\n                              return-object\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'eye'\" \n                              v-model=\"eye\"\n                              v-bind:items=\"eyes\"\n                              v-bind:rules=\"[v => !!v || 'Eye colour is required']\"\n                              label=\"Their eye colour\"\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'hair'\" \n                              v-model=\"hair\"\n                              v-bind:items=\"hairColour\"\n                              v-bind:rules=\"[v => !!v || 'Hair colour is required']\"\n                              label=\"Their hair colour\"\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'hand'\" \n                              v-model=\"hand\"\n                              v-bind:items=\"handedness\"\n                              v-bind:rules=\"[v => !!v || 'Handedness is required']\"\n                              label=\"Their handedness\"\n                              required>\n                    </v-select>\n                  </v-form>\n                </v-container>\n              </v-card-text>\n              <v-card-actions>\n                <v-spacer></v-spacer>\n                <v-btn color=\"blue darken-1\" \n                       text \n                       v-on:click=\"close\">Cancel</v-btn>\n                <v-btn color=\"blue darken-1\" \n                       text \n                       v-on:click=\"save\">Save</v-btn>\n              </v-card-actions>\n            </v-card>\n          </v-dialog>\n        </v-toolbar>\n      </template>\n      <template v-slot:item.attribute=\"{ item }\">\n        <template v-if=\"type === 'eye'\">\n          {{capitalise(item.multiple.eye)}}\n        </template>\n        <template v-if=\"type === 'hair'\">\n          {{capitalise(item.multiple.hair)}}\n        </template>\n        <template v-if=\"type === 'hand'\">\n          {{capitalise(item.multiple.hand)}}\n        </template>\n      </template>\n      <template v-slot:item.actions=\"{ item }\">\n        <v-btn-toggle class=\"ma-1\">\n          <v-btn small\n                 color=\"red accent-4\"\n                 class=\"white--text\"\n                 v-on:click=\"deleteAttribute(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-delete\n            </v-icon>\n            Delete\n          </v-btn>\n          <v-btn small\n                 color=\"primary\"\n                 class=\"white--text\"\n                 v-on:click=\"editAttribute(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-pencil\n            </v-icon>\n            Edit\n          </v-btn>\n        </v-btn-toggle>\n      </template>\n    </v-data-table>\n  ",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.family.forEach(function (f) {
        return f.full_name = "".concat(f.title, " ").concat(f.forename, " ").concat(f.surname);
      });
    });
  },
  computed: _objectSpread({
    tableTitle: function tableTitle() {
      return "About the ".concat(this.type === 'eye' ? 'eye colour' : this.type === 'hair' ? 'hair colour' : 'handedness', " in your family");
    },
    newButton: function newButton() {
      return "Add ".concat(this.type === 'hand' ? 'handedness' : this.type, " details");
    },
    modalHeadline: function modalHeadline() {
      return "".concat(this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour' : 'Handedness');
    }
  }, Vuex.mapState(['family', 'eyes', 'hairColour', 'handedness'])),
  methods: {
    deleteAttribute: function deleteAttribute(item) {
      var index = this.family.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.$store.commit('updateValue', {
        index: index,
        type: 'multiple',
        attribute: this.type,
        value: null
      });
    },
    editAttribute: function editAttribute(item) {
      this.member = item;
      this[this.type] = item.multiple[this.type];
      this.dialog = true;
    },
    capitalise: function capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    close: function close() {
      var _this2 = this;

      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$nextTick(function () {
        _this2.member = null;
        _this2.eye = null;
        _this2.hair = null;
        _this2.hand = null;
      });
    },
    save: function save() {
      if (this.$refs.form.validate()) {
        this.$store.commit('updateValue', {
          index: this.family.indexOf(this.member),
          type: 'multiple',
          attribute: this.type,
          value: this.type === 'eye' ? this.eye : this.type === 'hair' ? this.hair : this.hand
        });
        this.close();
      }
    }
  },
  data: function data() {
    return {
      dialog: false,
      member: null,
      eye: null,
      hair: null,
      hand: null,
      headers: [{
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'full_name'
      }, {
        text: this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour' : 'Handedness',
        value: 'attribute'
      }, {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        width: 1,
        align: 'center'
      }]
    };
  }
});
exports.AttributeTable = AttributeTable;