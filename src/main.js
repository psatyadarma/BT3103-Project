import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.config.productionTip = false
Vue.use(VueRouter)

const myRouter = new VueRouter({
  routes: routes,
  mode:'history'
});

import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyC6ZPsVoPGjQaktjEZPDc7bJdkrEq3Kq2w",
    authDomain: "bt3103-project-7907e.firebaseapp.com",
    projectId: "bt3103-project-7907e",
    storageBucket: "bt3103-project-7907e.appspot.com",
    messagingSenderId: "420175747456",
    appId: "1:420175747456:web:30dab30706dc8167c78965",
    measurementId: "G-K2PNQBX9ZC"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
