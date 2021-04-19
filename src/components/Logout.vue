<template>
  <div>
    <nav>
      <ul class="navbar" style="list-style-type: none;">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/logout">Logout</router-link></li>
      </ul>
    </nav>
    <div>
      <h1>Logout</h1>
    </div>
    <div style="text-align:center" class="formdiv">
      <p>Do you want to sign out?</p>
      <div class="buttons">
        <button v-on:click="logout()">Yes</button>
        <button v-on:click="$router.go(-1)">Take me back</button>
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
  border: 4px solid black;
  padding: 20px;
  background: linear-gradient(180deg, #58BCB6 0%, #219A93 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 44px;
  width: 500px;
  height: 170px;
  margin: 70px auto;
}

h1 {
    text-align: center;
    font-size: 64px;
    padding-top: 100px;
}

p {
    text-align: center;
    font-size: 16pt;
    margin: 20px;
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
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    display: inline-block;
    align-items: center;
    text-align: center;
    background: white;
    color: #3a938d;
    border-radius: 20px;
    padding: 7px 35px;
    margin: 0 10px;
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
