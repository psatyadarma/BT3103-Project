<template>
  <div>
    <nav>
      <ul class="navbar" style="list-style-type: none;">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/logout">Logout</router-link></li>
      </ul>
    </nav>

    <div style="text-align:center" class="formdiv">
      <h1>Do you want to logout?</h1>
      <div class="buttons">
        <button v-on:click="logout()">Yes</button>
        <button v-on:click="$router.go(-1)">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "LogoutPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("Successfully logged out");
        })
        .catch((error) => {
          alert(error.message);
        });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.formdiv {
  border-radius: 25px;
  border: 4px solid black;
  padding: 20px;
  background-image: linear-gradient(rgb(128, 19, 0), yellow);
  width: 400px;
  margin: auto;
}
h1 {
  font-size: 24pt;
}
input,
select {
  height: 40px;
  width: 200 px;
  font-size: 14pt;
  margin: 5px 0;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 2px 1px;
}

button {
  height: 40px;
  width: 100px;
  font-size: 14pt;
  background-color: aquamarine;
}

nav {
  list-style-type: none;
  margin: 10px;
  padding: 0;
  overflow: hidden;
  color: black;
  float: right;
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-weight: bold;
}

nav li {
  float: left;
}

nav a {
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-weight: bold;
}

</style>
