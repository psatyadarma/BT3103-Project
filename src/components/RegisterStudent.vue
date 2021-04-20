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
      <h1>Register Your Account</h1>
    </div>
    <div style="text-align:center" class="formdiv">
      <form @submit.prevent="register">
        <label for="first" style="font-size:16pt"><b>First Name</b></label
        ><br />
        <input
          type="text"
          placeholder="First Name"
          v-model="first"
          required
        /><br /><br />
        <label for="last" style="font-size:16pt"><b>Last Name</b></label
        ><br />
        <input
          type="text"
          placeholder="Last Name"
          v-model="last"
          required
        /><br /><br />
        <label for="phone" style="font-size:16pt"><b>Phone Number</b></label
        ><br />
        <input
          v-model.number="phone"
          type="number"
          placeholder="Phone Number"
          required
        /><br /><br />
        <label for="email" style="font-size:16pt"><b>Email Address</b></label
        ><br />
        <input
          type="email"
          placeholder="Email address"
          v-model="email"
          required
        /><br /><br />
        <label for="password" style="font-size:16pt"><b>Password</b></label
        ><br />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        /><br /><br />
        <select v-model="education">
          <option disabled value="">Education Level</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Junior College</option>
          <option>University</option> 
        </select>
        <br /><br />
        <button type="submit" value="register">Register</button>
      </form>
    </div>
  </div>
</template>

<script>

import logo from "../assets/logo2.png"
import firebase from "../firebase";
var db = firebase.firestore();

export default {
  name: "RegisterStudent",
  data() {
    return {
      first: "",
      last: "",
      email: "",
      password: "",
      phone: "",
      education: "",
      image: "",
      mytutor: [],
      logo: logo
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          var studentid = user.user.uid;
          console.log(user.user.uid);
          db.collection("students")
            .doc(user.user.uid)
            .set({
              first_name: this.first,
              last_name: this.last,
              email: this.email,
              phone: this.phone,
              education: this.education,
              image: this.image,
              mytutors: this.mytutor,
              stuid: studentid,
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          alert("Successfully registered!");

          this.$router.push("/homeStudent");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.formdiv {
  border-radius: 25px;
  border: 4px solid black;
  padding: 20px;
  background-image: linear-gradient(#55c9c2, white);
  width: 400px;
  margin: 50px auto;
}

h1 {
    text-align: center;
    font-size: 64px;
    padding-top: 100px;
    margin: 10px auto;
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
    background: #3a938d;
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

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

select {
    font-size: 16px;
    color: rgb(70, 70, 70);
    padding: .6em 3em .5em .8em;
    max-width: 100%;
    margin: 10px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}

select:hover {
    border-color: rgb(70, 70, 70);
}

</style>
