import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import GAuth from 'vue-google-oauth2'
Vue.use(GAuth, {
  clientId: '161807912668-2f6o8mmap6dhtvgchosmtk44fngvb08i.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'select_account'
})


Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LottieVuePlayer);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
