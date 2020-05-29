(function () {
  'use strict';

  Vue.use(Vuex);

  const store = new Vuex.Store({
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
        state.family[index][type][attribute] = value;
      }
    }
  });

  store.subscribe((mutation, state) => {
  	localStorage.setItem('store', JSON.stringify(state));
  });

  const AboutYou = Vue.component('about-you', {
    template: `
    <v-card class="mb-3">
      <v-card-title class="primary white--text mb-2">
        <h3>
          About you
        </h3>
      </v-card-title>
      <v-card-text>
        <v-select v-model="title"
                  v-bind:items="titles"
                  v-bind:rules="[v => !!v || 'Title is required']"
                  label="Your title"
                  required>
        </v-select>
        <v-text-field v-model="forename"
                      v-bind:rules="[v => !!v || 'Forename is required']"
                      label="Your forename"
                      required>
        </v-text-field>
        <v-text-field v-model="surname"
                      v-bind:rules="[v => !!v || 'Surname is required']"
                      label="Your surname"
                      required>
        </v-text-field>
        <v-menu ref="menu"
                v-model="menu"
                v-bind:close-on-content-click="false"
                v-bind:return-value.sync="dob"
                transition="scale-transition"
                offset-y
                min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="dob"
                          label="Date of birth"
                          v-bind:rules="[v => !!v || 'Date of birth is required']"
                          v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="dob">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dob)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-card-text>
    </v-card>
  `,
    data: () => ({
      menu: false
    }),
    computed: {
      title: {
        get() {
          return this.$store.state.family[0].title
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'title',
            value
          });
        }
      },
      forename: {
        get() {
          return this.$store.state.family[0].forename
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'forename',
            value
          });
        }
      },
      surname: {
        get() {
          return this.$store.state.family[0].surname
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'surname',
            value
          });
        }
      },
      dob: {
        get() {
          return this.$store.state.family[0].dob
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'dob',
            value
          });
        }
      },
      ...Vuex.mapState(['titles'])
    }
  });

  const FullName = Vue.component('full-name', {
    functional: true,
    render: function (createElement, context) {
      const item = context.props.item;
      return createElement('span', `${ item.title } ${ item.forename } ${ item.surname }`)
    }
  });

  const FamilyTable = Vue.component('family-table', {
    template: `
    <v-data-table v-bind:headers="headers"
                  v-bind:items="family.slice(1)"
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
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" 
                    max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" 
                     dark 
                     class="mb-2" 
                     v-on="on">
                New family member
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">
                  {{ formTitle }}
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-select v-model="editedItem.title"
                              v-bind:items="titles"
                              v-bind:rules="[v => !!v || 'Item is required']"
                              label="Their title"
                              required>
                    </v-select>
                    <v-text-field v-model="editedItem.forename"
                                  label="Their forename"
                                  v-bind:rules="nameRules"
                                  required>
                    </v-text-field>
                    <v-text-field v-model="editedItem.surname"
                                  label="Their surname"
                                  v-bind:rules="nameRules"
                                  required>
                    </v-text-field>
                    <v-menu ref="menu"
                            v-model="menu"
                            v-bind:close-on-content-click="false"
                            v-bind:return-value.sync="editedItem.dob"
                            transition="scale-transition"
                            offset-y
                            min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="editedItem.dob"
                                      label="Their date of birth"
                                      v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.dob">
                        <v-spacer></v-spacer>
                        <v-btn text 
                               color="primary" 
                               v-on:click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn text 
                               color="primary" 
                               v-on:click="$refs.menu.save(editedItem.dob)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text 
                       color="blue darken-1" 
                       v-on:click="close">
                  Cancel
                </v-btn>
                <v-btn text 
                       color="blue darken-1" 
                       v-on:click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.full_name="{ item }">
        <full-name v-bind:item="item"/>
      </template>
      <template v-slot:item.date_of_birth="{ item }">
        {{new Date(item.dob).toLocaleDateString('en-GB')}}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn-toggle class="ma-1">
          <v-btn small
                 color="red accent-4"
                 class="white--text"
                 v-on:click="deleteItem(item)">
            <v-icon small 
                    color="white">
              mdi-delete
            </v-icon>
            Delete
          </v-btn>
          <v-btn small
                 color="primary"
                 class="white--text"
                 v-on:click="editItem(item)">
            <v-icon small 
                    color="white">
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-data-table>
  `,
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...Vuex.mapState(['family', 'titles'])
    },
    components: {
      FullName
    },
    methods:{
      close () {
        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      save() {
        if(this.$refs.form.validate()){
          if (this.editedIndex > -1) {
            this.$store.commit('updateMember', {
              index: this.editedIndex,
              member: this.editedItem
            });
          } else {
            this.$store.commit('addMember', this.editedItem);
          }
          this.close();
        }
      }, 
      editItem (item) {
        this.editedIndex = this.family.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        const index = this.family.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.commit('removeMember', index);
      }
    },
    data() {
      return {
        nameRules: [
          v => !!v || 'Name is required'
        ],
        menu: false,
        dialog: false,
        showModal: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'full_name',
          },
          { 
            text: 'Date of Birth',
            sortable: false,
            value: 'date_of_birth' 
          },
          { 
            text: 'Actions', 
            value: 'actions', 
            sortable: false,
            width: 1,
            align: 'center'
          }
        ],
        editedItem: {
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
        },
        defaultItem: {
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
      }
    }
  });

  const Home = Vue.component('home', {
    template: `
    <div>
      <h1>Thank you 
        <small class="grey--text lighten-1">for taking part in this test.</small>
      </h1>
      <p>We're doing some testing on how easy it is for our users to input the members of a family and their details so we'd be grateful if you could imagine you are Dr. 08 08 with a <abbr title="Date of Birth">DOB</abbr> of 08/08/0808 (you're looking perfect for your age). Further, your family is like this:</p>
      <ul>
        <li>Your partner is Dr. 09 09, who was born on 09/09/0909.</li>
        <li>One child is Dr. 10 10 who was born on 10/10/1010 (they are not in the least bit lucky - more will be revealed).</li>
        <li>The other child is Dr. 11 11 who was born on (you've guessed it, haven't you?) 11/11/1111.</li>
      </ul>
      <p>Please use the two boxes below to enter details about you and your family then, when you're happy with the details you've provided, use the buttons at the bottom with the titles of <strong>Add Details</strong> to tell us more about you and your family. One uses one table to enter the data (<strong>Add Details - TABLE</strong>); the other uses multiple tables (<strong>Add Details - TABLES</strong>). We don't have a preference for either as they both involve pretty much the same work, but we're interested in which is the easiest and most pleasant to use.</p>
      <v-form ref="form">
        <about-you/>
        <family-table/>
        <v-card class="mb-3">
          <v-card-text>
            <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference; we're merely trying to find the best way for people to enter data.</p>
          </v-card-text>
        </v-card>
        <div class="d-flex justify-space-between mb-6">
          <v-btn x-large 
                 color="primary" 
                 dark
                 v-on:click="moveTo('tables')">
            Add Details - TABLES
          </v-btn>
          <v-btn x-large 
                 color="primary" 
                 dark
                 v-on:click="moveTo('table')">
            Add Details - TABLE
          </v-btn>
        </div>
      </v-form> 
    </div>
  `,
    methods: {
      moveTo(page) {
        if(this.$refs.form.validate()){
          this.$router.push({name: page});
        }
      },
    },
    components:{
      AboutYou,
      FamilyTable
    }
  });

  const AttributeButton = Vue.component('attribute-button', {
    template: `
    <span>
      <v-btn v-if="!capitalisedValue"
             small
             color="primary light"
             v-on:click="$emit('click')">
        Add {{label}}
      </v-btn>
      <v-btn v-else
             small 
             class="secondary"
             v-on:click="$emit('click')">
        {{capitalisedValue}}
        <v-divider color="white" 
                   class="mx-2"
                   vertical/> 
        <i class="fa fa-edit" title="Edit"></i>
        Edit {{label}}
      </v-btn>
    </span>
  `,
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
      capitalisedValue() {
        return this.value
          ? this.value.charAt(0).toUpperCase() + this.value.slice(1)
          : ''
      },
      label() {
        return this.type === 'eye'
          ? 'eye colour'
          : this.type === 'hair'
            ? 'Hair colour'
            : 'handedness'
      }
    },
  });

  const SingleTable = Vue.component('single-table', {
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
        this.type = attribute;
        this.enabled = !!item.single[attribute];
        this[attribute] = item.single[attribute];
        this.member = item;
        this.dialog = true;
      },
      close(){
        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(() => {
          this.enabled = false;
          this.member = null;
          this.eye = null;
          this.hair = null;
          this.hand = null;
        });
      },
      save () {
        if(this.$refs.form.validate()) {
          if((this.type === 'eye' || this.type === 'hair') && !this.enabled){
            console.log("null it");
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
          this.close();
        }
      }
    }
  });

  const AttributeTable = Vue.component('attribute-table', {
    template: `
    <v-data-table v-bind:headers="headers"
                  v-bind:items="family.filter(f => f.multiple[type])"
                  v-bind:items-per-page="5"
                  class="mb-3 elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="primary white--text">
          <v-toolbar-title>
            <h3>{{tableTitle}}</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" 
                    max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" 
                     dark 
                     class="mb-2" 
                     v-on="on">
                {{newButton}}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{modalHeadline}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-select v-model="member"
                              v-bind:items="member ? [member] : family.filter(f => !f.multiple[type])"
                              v-bind:rules="[v => !!v || 'Item is required']"
                              item-text="full_name"
                              label="Family member"
                              return-object
                              required>
                    </v-select>
                    <v-select v-if="type === 'eye'" 
                              v-model="eye"
                              v-bind:items="eyes"
                              v-bind:rules="[v => !!v || 'Eye colour is required']"
                              label="Their eye colour"
                              required>
                    </v-select>
                    <v-select v-if="type === 'hair'" 
                              v-model="hair"
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
        </v-toolbar>
      </template>
      <template v-slot:item.attribute="{ item }">
        <template v-if="type === 'eye'">
          {{capitalise(item.multiple.eye)}}
        </template>
        <template v-if="type === 'hair'">
          {{capitalise(item.multiple.hair)}}
        </template>
        <template v-if="type === 'hand'">
          {{capitalise(item.multiple.hand)}}
        </template>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn-toggle class="ma-1">
          <v-btn small
                 color="red accent-4"
                 class="white--text"
                 v-on:click="deleteAttribute(item)">
            <v-icon small 
                    color="white">
              mdi-delete
            </v-icon>
            Delete
          </v-btn>
          <v-btn small
                 color="primary"
                 class="white--text"
                 v-on:click="editAttribute(item)">
            <v-icon small 
                    color="white">
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-data-table>
  `,
    props:{
      type: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.family.forEach(f => f.full_name = `${f.title} ${f.forename} ${f.surname}`);
      });
    },
    computed: {
      tableTitle () {
        return `About the ${this.type === 'eye' 
        ? 'eye colour' 
        : this.type === 'hair' 
          ? 'hair colour' 
          : 'handedness'} in your family`
      },
      newButton () {
        return `Add ${this.type === 'hand' 
        ? 'handedness' 
        : this.type} details`
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
    methods: {
      deleteAttribute(item) {
        const index = this.family.indexOf(item);
        confirm('Are you sure you want to delete this item?') &&
          this.$store.commit('updateValue', {
            index,
            type: 'multiple',
            attribute: this.type,
            value: null,
          });
      },
      editAttribute(item) {
        this.member = item;
        this[this.type] = item.multiple[this.type];
        this.dialog = true;
      },
      capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
      close () {
        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(() => {
          this.member = null;
          this.eye = null;
          this.hair = null;
          this.hand = null;
        });
      },
      save () {
        if(this.$refs.form.validate()) {
          this.$store.commit('updateValue', {
            index: this.family.indexOf(this.member),
            type: 'multiple',
            attribute: this.type,
            value: this.type === 'eye'
              ? this.eye
              : this.type === 'hair'
                ? this.hair
                : this.hand,
          });
          this.close();
        }
      }
    },
    data() {
      return {
        dialog: false,
        member: null,
        eye: null,
        hair: null,
        hand: null,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'full_name',
          },
          { 
            text: (this.type === 'eye'
              ? 'Eye colour'
              : this.type === 'hair'
                ? 'Hair colour'
                : 'Handedness'),
            value: 'attribute' 
          },
          { 
            text: 'Actions', 
            value: 'actions', 
            sortable: false,
            width: 1,
            align: 'center'
          }
        ],
      }
    }
  });

  const MultipleTable = Vue.component('multiple-table', {
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
        this.modalType = attribute;
        if (type === 'add') {
          this.localFamily = [...this.family];
          this.localFamily.forEach(function (element) {
            if (element.multiple[attribute] !== null) {
              element.disabled = true;
            } else {
              delete element.disabled;
            }
          });
          this.showModal = true;
        }
        if (type === 'update') {
          this.localFamily = [...this.family];
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
      nullAttribute(index, attribute) {
        this.$store.commit('updateValue', {
          index,
          type: 'multiple',
          attribute,
          value: null
        });
      }
    }
  });

  const router = new VueRouter({
    routes: [
      { 
        path: '/', 
        name: 'home', 
        component: Home 
      },
      { 
        path: '/single', 
        name: 'table', 
        component: SingleTable 
      },
      { 
        path: '/multiple', 
        name: 'tables', 
        component: MultipleTable 
      }
    ]
  });

  Vue.config.devtools = true;

  Vue.use(Vuex);
  Vue.use(VueRouter);

  new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    store,
    router,
    beforeCreate() {
      this.$store.commit('initialiseStore');
    }
  });

}());
