import { AboutYou } from './AboutYou.js';
import { FamilyTable } from './FamilyTable.js'

export const Home = Vue.component('home', {
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