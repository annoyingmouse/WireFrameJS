/**
 * Inspiration:
 * https://gist.github.com/tbreuss/a8974449bac9ec67d95d535d73305200
 */

import { createApp, ref, computed } from "vue";
import { createVuetify } from "vuetify";
import { router } from "./router.js";
import { store } from "./store.js";

const vuetify = createVuetify();

const app = createApp({
  setup() {},
  template: `
    <v-app>
      <v-app-bar color="dark" dense dark>
        <v-app-bar-title>
          User Test
        </v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/about">About</RouterLink>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  `,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});

app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
