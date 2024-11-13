"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.MultipleTable = void 0;

var _AttributeTable = require("./AttributeTable.js");

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var MultipleTable = Vue.component("multiple-table", {
  template:
    '\n    <div>\n      <h1>\n        Thank you again \n        <small class="grey--text lighten-1">for taking part in this test, you\'re very nearly done.</small>\n      </h1>\n      <p>If you can see three tables below, then you\'re ready to go. We\'d like you to add some details to the family by clicking the buttons under each table. You (as Dr 08 08) have brown hair, brown eyes and you\'re left-handed. The rest of your family has these details:</p>\n      <ul>\n        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I\'m not sure I\'d trust them <abbr title="To Be Honest">TBH</abbr>).</li>\n        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n      </ul>\n      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you\'ve already entered the data there, then get back to us, we\'d be grateful. I\'ll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n      <p>We appreciate that the scenario is contrived, but it\'s just a made-up use case, and no data you enter is saved to a server, it\'s all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      <attribute-table type="eye"/>\n      <attribute-table type="hair"/>\n      <attribute-table type="hand"/>\n      <v-btn block \n             x-large\n             color="primary"\n             class="mb-6"\n             v-on:click="$router.push({\n               name: \'home\'\n             })">\n        Go Back\n      </v-btn>\n    </div>\n  ',
  computed: Vuex.mapState(["family"]),
  data: function data() {
    return {
      localFamily: null,
      selectedMember: -1,
      eye: -1,
      hair: -1,
      hand: -1,
      showModal: false,
      modalType: null,
    };
  },
  components: {
    AttributeTable: _AttributeTable.AttributeTable,
  },
  methods: {
    capitalise: function capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    closeModal: function closeModal() {
      this.showModal = false;
      this.selectedMember = -1;
      this.eye = -1;
      this.hair = -1;
      this.hand = -1;
      this.localFamily = null;
    },
    openModal: function openModal(type, attribute, index) {
      this.modalType = attribute;

      if (type === "add") {
        this.localFamily = _toConsumableArray(this.family);
        this.localFamily.forEach(function (element) {
          if (element.multiple[attribute] !== null) {
            element.disabled = true;
          } else {
            delete element.disabled;
          }
        });
        this.showModal = true;
      }

      if (type === "update") {
        this.localFamily = _toConsumableArray(this.family);
        this.localFamily.forEach(function (element, i) {
          if (i !== index) {
            element.disabled = true;
          }
        });
        this[attribute] = this.family[index].multiple[attribute];
        this.selectedMember = index;
        this.showModal = true;
      }
    },
    nullAttribute: function nullAttribute(index, attribute) {
      this.$store.commit("updateValue", {
        index: index,
        type: "multiple",
        attribute: attribute,
        value: null,
      });
    },
  },
});
exports.MultipleTable = MultipleTable;
