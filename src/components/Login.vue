<template>
  <div>
    <img id="logo" :src="logo" />
    <nav>
      <ul class="navbar" style="list-style-type: none;">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
    <div>
      <h1>Login</h1>
    </div>
    <div style="text-align:center" class="formdiv">
      <p>Sign-in to Your Account</p>
      <form @submit.prevent="login">
        <input
          type="email"
          placeholder="Email address"
          v-model="email"
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
        /><br /><br />
        <button type="submit" value="login">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import logo from "../assets/logo2.png"
import firebase from "../firebase";
var db = firebase.firestore();

export default {
  name: "SignInPage",
  data() {
    return {
      email: "",
      password: "",
      logo: logo
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          alert("Successfully logged in");
          console.log(user);
          const usersRef = db.collection("profiles").doc(user.user.uid);
          usersRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              this.$router.push("/homeTutor");
            } else {
              this.$router.push("/homeStudent");
            }
          });
        })
        .catch((error) => {
          alert("Login is incorrect");
        });
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
  width: 400px;
  margin: 50px auto;
}

h1 {
    text-align: center;
    font-size: 64px;
    padding-top: 100px;
    margin: 10px auto;
}

p {
    font-size: 16pt;
    margin: 20px auto;
}

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
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
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    border-radius: 20px;
    padding: 7px 35px;
    color: #3a938d;
    background: white;
    cursor: pointer;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

button:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

input:focus {
  outline: none;
}

nav {
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  color: black;
  float: right;
  display: block;
  text-align: center;
  padding: 14px 36px;
  text-decoration: none;
  font-weight: bold;
}

nav li {
  float: left;
}

nav a {
  display: block;
  text-align: center;
  padding: 24px 16px;
  text-decoration: none;
  font-weight: bold;
}

</style>
