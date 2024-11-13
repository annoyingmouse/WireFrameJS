"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.store = void 0;
Vue.use(Vuex);
var store = new Vuex.Store({
  state: {
    family: [
      {
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
    ],
    titles: ["Dr.", "Mr.", "Mrs.", "Miss.", "Ms."],
    eyes: ["brown", "hazel", "blue", "green", "silver", "amber"],
    hairColour: [
      "black",
      "brown",
      "blond",
      "auburn",
      "chestnut",
      "red",
      "grey",
      "white",
    ],
    handedness: [
      "right-handed",
      "left-handed",
      "mixed-handed",
      "ambidextrous",
      "ambilevous",
    ],
  },
  mutations: {
    initialiseStore: function initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store"))),
        );
      }
    },
    update: function update(state, _ref) {
      var attribute = _ref.attribute,
        value = _ref.value;
      state.family[0][attribute] = value;
    },
    addMember: function addMember(state, member) {
      state.family.push(member);
    },
    removeMember: function removeMember(state, index) {
      state.family.splice(index, 1);
    },
    updateMember: function updateMember(state, _ref2) {
      var index = _ref2.index,
        member = _ref2.member;
      state.family.splice(index, 1, member);
    },
    updateValue: function updateValue(state, _ref3) {
      var index = _ref3.index,
        type = _ref3.type,
        attribute = _ref3.attribute,
        value = _ref3.value;
      state.family[index][type][attribute] = value;
    },
  },
});
exports.store = store;
store.subscribe(function (mutation, state) {
  localStorage.setItem("store", JSON.stringify(state));
});
