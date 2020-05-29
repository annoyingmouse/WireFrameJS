export const AboutYou = Vue.component('about-you', {
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
        })
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
        })
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
        })
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
        })
      }
    },
    ...Vuex.mapState(['titles'])
  }
});