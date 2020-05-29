import { FullName } from '../home/FullName.js'
import { AttributeButton } from './AttributeButton.js'

export const SingleTable = Vue.component('single-table', {
  template: `
    <div>
      <h1>
        Thank you again 
        <small class="grey--text lighten-1">for taking part in this test, you're very nearly done.</small>
      </h1>
      <p>If you can see a table below with four people in it (Doctors 08 08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11 11 (11/11/1111)), then you're ready to go. We'd like you to add some details to the family. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>
      <ul>
        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title="To Be Honest">TBH</abbr>).</li>
        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>
        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>
      </ul>
      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>
      <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>
      <v-data-table v-bind:headers="headers"
                    v-bind:items="family"
                    v-bind:items-per-page="5"
                    class="mb-3 elevation-1">
        <template v-slot:top>
          <v-toolbar flat 
                     color="primary white--text">
            <v-toolbar-title>
              <h3>
                About your family
              </h3>
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.full_name="{ item }">
          <full-name v-bind:item="item"/>
        </template>
        <template v-slot:item.eye_colour="{ item }">
          <attribute-button type="eye"
                            v-bind:value="item.single.eye"
                            v-on:click="openModal('eye', item)"/>
        </template>
        <template v-slot:item.hair_colour="{ item }">
          <attribute-button type="hair"
                            v-bind:value="item.single.hair"
                            v-on:click="openModal('hair', item)"/>
        </template>
        <template v-slot:item.handedness="{ item }">
          <attribute-button type="hand"
                            v-bind:value="item.single.hand"
                            v-on:click="openModal('hand', item)"/>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" 
                max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{modalHeadline}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-switch v-if="type === 'eye' || type === 'hair'"
                          v-model="enabled" 
                          v-bind:label="enabledLabel"></v-switch>
                <v-select v-if="type === 'eye'" 
                          v-model="eye"
                          v-bind:disabled="!enabled"
                          v-bind:items="eyes"
                          v-bind:rules="[v => !!v || 'Eye colour is required']"
                          label="Their eye colour"
                          required>
                </v-select>
                <v-select v-if="type === 'hair'" 
                          v-model="hair"
                          v-bind:disabled="!enabled"
                          v-bind:items="hairColour"
                          v-bind:rules="[v => !!v || 'Hair colour is required']"
                          label="Their hair colour"
                          required>
                </v-select>
                <v-select v-if="type === 'hand'" 
                          v-model="hand"
                          v-bind:items="handedness"
                          v-bind:rules="[v => !!v || 'Handedness is required']"
                          label="Their handedness"
                          required>
                </v-select>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" 
                   text 
                   v-on:click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" 
                   text 
                   v-on:click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name',
        },
        {
          text: 'Eye colour',
          value: 'eye_colour',
          width: 1,
          align: 'center'
        },
        {
          text: 'Hair colour',
          value: 'hair_colour',
          width: 1,
          align: 'center'
        },
        {
          text: 'Handedness',
          value: 'handedness',
          width: 1,
          align: 'center'
        }
      ],
      dialog: false,
      enabled: false,
      type: null,
      member: null,
      eye: null,
      hair: null,
      hand: null
    }
  },
  computed: {
    enabledLabel () {
      return `
        ${this.member?.title} 
        ${this.member?.forename} 
        ${this.member?.surname} 
        has ${this.type === 'eye' 
          ? 'eyes' 
          : 'hair'}`
    },
    modalHeadline () {
      return `${this.type === 'eye'
          ? 'Eye colour'
          : this.type === 'hair'
              ? 'Hair colour'
              : 'Handedness'}`
    },
    ...Vuex.mapState(['family', 'eyes', 'hairColour', 'handedness'])
  },
  components: {
    FullName,
    AttributeButton
  },
  methods: {
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    closeModal(){
      this.showModal = false;
    },
    openModal(attribute, item){
      this.type = attribute
      this.enabled = !!item.single[attribute]
      this[attribute] = item.single[attribute]
      this.member = item
      this.dialog = true
    },
    close(){
      this.dialog = false
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.enabled = false
        this.member = null
        this.eye = null
        this.hair = null
        this.hand = null
      })
    },
    save () {
      if(this.$refs.form.validate()) {
        if((this.type === 'eye' || this.type === 'hair') && !this.enabled){
          console.log("null it")
        }
        this.$store.commit('updateValue', {
          index: this.family.indexOf(this.member),
          type: 'single',
          attribute: this.type,
          value: (this.type === 'eye' || this.type === 'hair') && !this.enabled
            ? null
            : this.type === 'eye'
              ? this.eye
              : this.type === 'hair'
                ? this.hair
                : this.hand,
        });
        this.close()
      }
    }
  }
});