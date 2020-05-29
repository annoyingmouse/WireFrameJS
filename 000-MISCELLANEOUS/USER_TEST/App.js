import { store } from './store/store.js'
import { router } from './router/router.js'

Vue.config.devtools = true

Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  vuetify: new Vuetify({}),
  store,
  router,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
})