export const AttributeTable = Vue.component('attribute-table', {
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
      this.family.forEach(f => f.full_name = `${f.title} ${f.forename} ${f.surname}`)
    })
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
      const index = this.family.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.$store.commit('updateValue', {
          index,
          type: 'multiple',
          attribute: this.type,
          value: null,
        });
    },
    editAttribute(item) {
      this.member = item
      this[this.type] = item.multiple[this.type];
      this.dialog = true
    },
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    close () {
      this.dialog = false
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.member = null
        this.eye = null
        this.hair = null
        this.hand = null
      })
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
        this.close()
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
})