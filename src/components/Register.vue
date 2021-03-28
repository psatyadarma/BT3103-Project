<template>
  <div>
    <form @submit.prevent="register">
      <h2>Register</h2><br>
      <input
        type="text"
        placeholder="First Name"
        v-model="first"
      /><br>
      <input
        type="text"
        placeholder="Last Name"
        v-model="last"
      /><br>
      <input
        type="email"
        placeholder="Email address..."
        v-model="email"
      /><br>
      <input
        type="password"
        placeholder="password..."
        v-model="password"
      /><br>
      <button type="submit" value="register">Register</button>
    </form>
</div>
</template>

<script>
import firebase from "firebase"
import db from "../firebase"

export default {
  name: 'SignUpPage',
  data() {
    return {
      first:'',
      last:'',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user.uid)
          db.collection("profiles").doc(user.user.uid).set({
            first_name: this.first,
            last_name: this.last
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
             console.error("Error writing document: ", error);
          });
          alert('Successfully registered!');
          
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.message);
        });
  },
},
}
</script>

<style>
</style>