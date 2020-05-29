"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeButton = void 0;
var AttributeButton = Vue.component('attribute-button', {
  template: "\n    <span>\n      <v-btn v-if=\"!capitalisedValue\"\n             small\n             color=\"primary light\"\n             v-on:click=\"$emit('click')\">\n        Add {{label}}\n      </v-btn>\n      <v-btn v-else\n             small \n             class=\"secondary\"\n             v-on:click=\"$emit('click')\">\n        {{capitalisedValue}}\n        <v-divider color=\"white\" \n                   class=\"mx-2\"\n                   vertical/> \n        <i class=\"fa fa-edit\" title=\"Edit\"></i>\n        Edit {{label}}\n      </v-btn>\n    </span>\n  ",
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  computed: {
    capitalisedValue: function capitalisedValue() {
      return this.value ? this.value.charAt(0).toUpperCase() + this.value.slice(1) : '';
    },
    label: function label() {
      return this.type === 'eye' ? 'eye colour' : this.type === 'hair' ? 'Hair colour' : 'handedness';
    }
  }
});
exports.AttributeButton = AttributeButton;