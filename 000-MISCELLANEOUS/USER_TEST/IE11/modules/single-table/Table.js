"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.SingleTable = void 0;

var _FullName = require("../home/FullName.js");

var _AttributeButton = require("./AttributeButton.js");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var SingleTable = Vue.component("single-table", {
  template:
    '\n    <div>\n      <h1>\n        Thank you again \n        <small class="grey--text lighten-1">for taking part in this test, you\'re very nearly done.</small>\n      </h1>\n      <p>If you can see a table below with four people in it (Doctors 08 08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11 11 (11/11/1111)), then you\'re ready to go. We\'d like you to add some details to the family. You (as Dr 08 08) have brown hair, brown eyes and you\'re left-handed. The rest of your family has these details:</p>\n      <ul>\n        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I\'m not sure I\'d trust them <abbr title="To Be Honest">TBH</abbr>).</li>\n        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n      </ul>\n      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you\'ve already entered the data there, then get back to us, we\'d be grateful. I\'ll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n      <p>We appreciate that the scenario is contrived, but it\'s just a made-up use case, and no data you enter is saved to a server, it\'s all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      <v-data-table v-bind:headers="headers"\n                    v-bind:items="family"\n                    v-bind:items-per-page="5"\n                    class="mb-3 elevation-1">\n        <template v-slot:top>\n          <v-toolbar flat \n                     color="primary white--text">\n            <v-toolbar-title>\n              <h3>\n                About your family\n              </h3>\n            </v-toolbar-title>\n          </v-toolbar>\n        </template>\n        <template v-slot:item.full_name="{ item }">\n          <full-name v-bind:item="item"/>\n        </template>\n        <template v-slot:item.eye_colour="{ item }">\n          <attribute-button type="eye"\n                            v-bind:value="item.single.eye"\n                            v-on:click="openModal(\'eye\', item)"/>\n        </template>\n        <template v-slot:item.hair_colour="{ item }">\n          <attribute-button type="hair"\n                            v-bind:value="item.single.hair"\n                            v-on:click="openModal(\'hair\', item)"/>\n        </template>\n        <template v-slot:item.handedness="{ item }">\n          <attribute-button type="hand"\n                            v-bind:value="item.single.hand"\n                            v-on:click="openModal(\'hand\', item)"/>\n        </template>\n      </v-data-table>\n      <v-dialog v-model="dialog" \n                max-width="500px">\n        <v-card>\n          <v-card-title>\n            <span class="headline">{{modalHeadline}}</span>\n          </v-card-title>\n          <v-card-text>\n            <v-container>\n              <v-form ref="form">\n                <v-switch v-if="type === \'eye\' || type === \'hair\'"\n                          v-model="enabled" \n                          v-bind:label="enabledLabel"></v-switch>\n                <v-select v-if="type === \'eye\'" \n                          v-model="eye"\n                          v-bind:disabled="!enabled"\n                          v-bind:items="eyes"\n                          v-bind:rules="[v => !!v || \'Eye colour is required\']"\n                          label="Their eye colour"\n                          required>\n                </v-select>\n                <v-select v-if="type === \'hair\'" \n                          v-model="hair"\n                          v-bind:disabled="!enabled"\n                          v-bind:items="hairColour"\n                          v-bind:rules="[v => !!v || \'Hair colour is required\']"\n                          label="Their hair colour"\n                          required>\n                </v-select>\n                <v-select v-if="type === \'hand\'" \n                          v-model="hand"\n                          v-bind:items="handedness"\n                          v-bind:rules="[v => !!v || \'Handedness is required\']"\n                          label="Their handedness"\n                          required>\n                </v-select>\n              </v-form>\n            </v-container>\n          </v-card-text>\n          <v-card-actions>\n            <v-spacer></v-spacer>\n            <v-btn color="blue darken-1" \n                   text \n                   v-on:click="close">Cancel</v-btn>\n            <v-btn color="blue darken-1" \n                   text \n                   v-on:click="save">Save</v-btn>\n          </v-card-actions>\n        </v-card>\n      </v-dialog>\n      <v-btn block \n             x-large\n             color="primary"\n             class="mb-6"\n             v-on:click="$router.push({\n               name: \'home\'\n             })">\n        Go Back\n      </v-btn>\n    </div>\n  ',
  data: function data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "full_name",
        },
        {
          text: "Eye colour",
          value: "eye_colour",
          width: 1,
          align: "center",
        },
        {
          text: "Hair colour",
          value: "hair_colour",
          width: 1,
          align: "center",
        },
        {
          text: "Handedness",
          value: "handedness",
          width: 1,
          align: "center",
        },
      ],
      dialog: false,
      enabled: false,
      type: null,
      member: null,
      eye: null,
      hair: null,
      hand: null,
    };
  },
  computed: _objectSpread(
    {
      enabledLabel: function enabledLabel() {
        var _this$member, _this$member2, _this$member3;

        return "\n        "
          .concat(
            (_this$member = this.member) === null || _this$member === void 0
              ? void 0
              : _this$member.title,
            " \n        ",
          )
          .concat(
            (_this$member2 = this.member) === null || _this$member2 === void 0
              ? void 0
              : _this$member2.forename,
            " \n        ",
          )
          .concat(
            (_this$member3 = this.member) === null || _this$member3 === void 0
              ? void 0
              : _this$member3.surname,
            " \n        has ",
          )
          .concat(this.type === "eye" ? "eyes" : "hair");
      },
      modalHeadline: function modalHeadline() {
        return "".concat(
          this.type === "eye"
            ? "Eye colour"
            : this.type === "hair"
              ? "Hair colour"
              : "Handedness",
        );
      },
    },
    Vuex.mapState(["family", "eyes", "hairColour", "handedness"]),
  ),
  components: {
    FullName: _FullName.FullName,
    AttributeButton: _AttributeButton.AttributeButton,
  },
  methods: {
    capitalise: function capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    closeModal: function closeModal() {
      this.showModal = false;
    },
    openModal: function openModal(attribute, item) {
      this.type = attribute;
      this.enabled = !!item.single[attribute];
      this[attribute] = item.single[attribute];
      this.member = item;
      this.dialog = true;
    },
    close: function close() {
      var _this = this;

      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$nextTick(function () {
        _this.enabled = false;
        _this.member = null;
        _this.eye = null;
        _this.hair = null;
        _this.hand = null;
      });
    },
    save: function save() {
      if (this.$refs.form.validate()) {
        if ((this.type === "eye" || this.type === "hair") && !this.enabled) {
          console.log("null it");
        }

        this.$store.commit("updateValue", {
          index: this.family.indexOf(this.member),
          type: "single",
          attribute: this.type,
          value:
            (this.type === "eye" || this.type === "hair") && !this.enabled
              ? null
              : this.type === "eye"
                ? this.eye
                : this.type === "hair"
                  ? this.hair
                  : this.hand,
        });
        this.close();
      }
    },
  },
});
exports.SingleTable = SingleTable;
