import { AttributeTable } from './AttributeTable.js';

export const MultipleTable = Vue.component('multiple-table', {
  template: `
    <div>
      <h1>
        Thank you again 
        <small class="grey--text lighten-1">for taking part in this test, you're very nearly done.</small>
      </h1>
      <p>If you can see three tables below, then you're ready to go. We'd like you to add some details to the family by clicking the buttons under each table. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>
      <ul>
        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title="To Be Honest">TBH</abbr>).</li>
        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>
        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>
      </ul>
      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>
      <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>
      <attribute-table type="eye"/>
      <attribute-table type="hair"/>
      <attribute-table type="hand"/>
      <v-btn block 
             x-large
             color="primary"
             class="mb-6"
             v-on:click="$router.push({
               name: 'home'
             })">
        Go Back
      </v-btn>
    </div>
  `,
  computed: Vuex.mapState(['family']),
  data() {
    return {
      localFamily: null,
      selectedMember: -1,
      eye: -1,
      hair: -1,
      hand: -1,
      showModal: false,
      modalType: null
    }
  },
  components: {
    AttributeTable
  },
  methods: {
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    closeModal(){
      this.showModal = false;
      this.selectedMember = -1;
      this.eye = -1;
      this.hair = -1;
      this.hand = -1;
      this.localFamily = null;
    },
    openModal(type, attribute, index){
      this.modalType = attribute
      if (type === 'add') {
        this.localFamily = [...this.family]
        this.localFamily.forEach(function (element) {
          if (element.multiple[attribute] !== null) {
            element.disabled = true;
          } else {
            delete element.disabled;
          }
        });
        this.showModal = true
      }
      if (type === 'update') {
        this.localFamily = [...this.family]
        this.localFamily.forEach(function (element, i) {
          if (i !== index) {
            element.disabled = true;
          }
        });
        this[attribute] = this.family[index].multiple[attribute];
        this.selectedMember = index;
        this.showModal = true
      }
    },
    nullAttribute(index, attribute) {
      this.$store.commit('updateValue', {
        index,
        type: 'multiple',
        attribute,
        value: null
      });
    }
  }
})