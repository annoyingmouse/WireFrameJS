Vue.use(Vuex)

export const store = new Vuex.Store({
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
          hand: null
        },
        single: {
          eye: null,
          hair: null,
          hand: null
        }
      }
    ],
    titles: [
      'Dr.', 'Mr.', 'Mrs.', 'Miss.', 'Ms.'
    ],
    eyes: [
      'brown', 'hazel', 'blue', 'green', 'silver', 'amber'
    ],
    hairColour: [
      'black', 'brown', 'blond', 'auburn', 'chestnut', 'red', 'grey', 'white'
    ],
    handedness: [
      'right-handed', 'left-handed', 'mixed-handed', 'ambidextrous', 'ambilevous'
    ]
  },
  mutations: {
    initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
    update(state, { 
      attribute, 
      value 
    }) {
      state.family[0][attribute] = value;
    },
    addMember(state, member) {
      state.family.push(member);
    },
    removeMember(state, index) {
      state.family.splice(index, 1);
    },
    updateMember(state, { 
      index, 
      member 
    }) {
      state.family.splice(index, 1, member);
    },
    updateValue(state, { 
      index, 
      type, 
      attribute, 
      value 
    }) {
      state.family[index][type][attribute] = value
    }
  }
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
})