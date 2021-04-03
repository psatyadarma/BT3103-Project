<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { beforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
  },
  setup() {
    const router = useRouter;
    const route = useRoute;

    beforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace('/');
        }
      }

      )
    }

    )
  }
}
</script>

<style>

</style>
