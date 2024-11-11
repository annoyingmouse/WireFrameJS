"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.FamilyTable = void 0;

var _FullName = require("./FullName.js");

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

var FamilyTable = Vue.component("family-table", {
	template:
		'\n    <v-data-table v-bind:headers="headers"\n                  v-bind:items="family.slice(1)"\n                  v-bind:items-per-page="5"\n                  class="mb-3 elevation-1">\n      <template v-slot:top>\n        <v-toolbar flat \n                   color="primary white--text">\n          <v-toolbar-title>\n            <h3>\n              About your family\n            </h3>\n          </v-toolbar-title>\n          <v-spacer></v-spacer>\n          <v-dialog v-model="dialog" \n                    max-width="500px">\n            <template v-slot:activator="{ on }">\n              <v-btn color="secondary" \n                     dark \n                     class="mb-2" \n                     v-on="on">\n                New family member\n              </v-btn>\n            </template>\n            <v-card>\n              <v-card-title>\n                <span class="headline">\n                  {{ formTitle }}\n                </span>\n              </v-card-title>\n              <v-card-text>\n                <v-container>\n                  <v-form ref="form">\n                    <v-select v-model="editedItem.title"\n                              v-bind:items="titles"\n                              v-bind:rules="[v => !!v || \'Item is required\']"\n                              label="Their title"\n                              required>\n                    </v-select>\n                    <v-text-field v-model="editedItem.forename"\n                                  label="Their forename"\n                                  v-bind:rules="nameRules"\n                                  required>\n                    </v-text-field>\n                    <v-text-field v-model="editedItem.surname"\n                                  label="Their surname"\n                                  v-bind:rules="nameRules"\n                                  required>\n                    </v-text-field>\n                    <v-menu ref="menu"\n                            v-model="menu"\n                            v-bind:close-on-content-click="false"\n                            v-bind:return-value.sync="editedItem.dob"\n                            transition="scale-transition"\n                            offset-y\n                            min-width="290px">\n                      <template v-slot:activator="{ on }">\n                        <v-text-field v-model="editedItem.dob"\n                                      label="Their date of birth"\n                                      v-on="on">\n                        </v-text-field>\n                      </template>\n                      <v-date-picker v-model="editedItem.dob">\n                        <v-spacer></v-spacer>\n                        <v-btn text \n                               color="primary" \n                               v-on:click="menu = false">\n                          Cancel\n                        </v-btn>\n                        <v-btn text \n                               color="primary" \n                               v-on:click="$refs.menu.save(editedItem.dob)">\n                          OK\n                        </v-btn>\n                      </v-date-picker>\n                    </v-menu>\n                  </v-form>\n                </v-container>\n              </v-card-text>\n              <v-card-actions>\n                <v-spacer></v-spacer>\n                <v-btn text \n                       color="blue darken-1" \n                       v-on:click="close">\n                  Cancel\n                </v-btn>\n                <v-btn text \n                       color="blue darken-1" \n                       v-on:click="save">\n                  Save\n                </v-btn>\n              </v-card-actions>\n            </v-card>\n          </v-dialog>\n        </v-toolbar>\n      </template>\n      <template v-slot:item.full_name="{ item }">\n        <full-name v-bind:item="item"/>\n      </template>\n      <template v-slot:item.date_of_birth="{ item }">\n        {{new Date(item.dob).toLocaleDateString(\'en-GB\')}}\n      </template>\n      <template v-slot:item.actions="{ item }">\n        <v-btn-toggle class="ma-1">\n          <v-btn small\n                 color="red accent-4"\n                 class="white--text"\n                 v-on:click="deleteItem(item)">\n            <v-icon small \n                    color="white">\n              mdi-delete\n            </v-icon>\n            Delete\n          </v-btn>\n          <v-btn small\n                 color="primary"\n                 class="white--text"\n                 v-on:click="editItem(item)">\n            <v-icon small \n                    color="white">\n              mdi-pencil\n            </v-icon>\n            Edit\n          </v-btn>\n        </v-btn-toggle>\n      </template>\n    </v-data-table>\n  ',
	computed: _objectSpread(
		{
			formTitle: function formTitle() {
				return this.editedIndex === -1 ? "New Item" : "Edit Item";
			},
		},
		Vuex.mapState(["family", "titles"]),
	),
	components: {
		FullName: _FullName.FullName,
	},
	methods: {
		close: function close() {
			var _this = this;

			this.dialog = false;
			this.$refs.form.resetValidation();
			this.$nextTick(function () {
				_this.editedItem = Object.assign({}, _this.defaultItem);
				_this.editedIndex = -1;
			});
		},
		save: function save() {
			if (this.$refs.form.validate()) {
				if (this.editedIndex > -1) {
					this.$store.commit("updateMember", {
						index: this.editedIndex,
						member: this.editedItem,
					});
				} else {
					this.$store.commit("addMember", this.editedItem);
				}

				this.close();
			}
		},
		editItem: function editItem(item) {
			this.editedIndex = this.family.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem: function deleteItem(item) {
			var index = this.family.indexOf(item);
			confirm("Are you sure you want to delete this item?") &&
				this.$store.commit("removeMember", index);
		},
	},
	data: function data() {
		return {
			nameRules: [
				function (v) {
					return !!v || "Name is required";
				},
			],
			menu: false,
			dialog: false,
			showModal: false,
			editedIndex: -1,
			headers: [
				{
					text: "Name",
					align: "start",
					sortable: true,
					value: "full_name",
				},
				{
					text: "Date of Birth",
					sortable: false,
					value: "date_of_birth",
				},
				{
					text: "Actions",
					value: "actions",
					sortable: false,
					width: 1,
					align: "center",
				},
			],
			editedItem: {
				title: null,
				forename: null,
				surname: null,
				dob: null,
				multiple: {
					eye: null,
					hair: null,
					hand: null,
				},
				single: {
					eye: null,
					hair: null,
					hand: null,
				},
			},
			defaultItem: {
				title: null,
				forename: null,
				surname: null,
				dob: null,
				multiple: {
					eye: null,
					hair: null,
					hand: null,
				},
				single: {
					eye: null,
					hair: null,
					hand: null,
				},
			},
		};
	},
});
exports.FamilyTable = FamilyTable;
