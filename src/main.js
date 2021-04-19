import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import vuetify from './plugins/vuetify.js' // path to vuetify export'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueRouter)
Vue.use(VueTextareaAutosize)
Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes: routes,
  mode:'history'
});


new Vue({
  vuetify,
  render: h => h(App),
  router:myRouter
}).$mount('#app')
