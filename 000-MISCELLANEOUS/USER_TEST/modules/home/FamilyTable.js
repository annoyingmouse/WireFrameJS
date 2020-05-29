import { FullName } from './FullName.js'

export const FamilyTable = Vue.component('family-table', {
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
      this.dialog = false
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
        this.close()
      }
    }, 
    editItem (item) {
      this.editedIndex = this.family.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.family.indexOf(item)
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
})