<template>
  <div style="text-align:center">
    <h1>Register Your Account</h1>
    <form @submit.prevent="register" style="background-color:#E6E6FA">
      <label for="first" style="font-size:16pt">First Name</label><br>
      <input
        type="text"
        placeholder="First Name"
        v-model="first"
      required /><br><br>
      <label for="last" style="font-size:16pt">Last Name</label><br>
      <input
        type="text"
        placeholder="Last Name"
        v-model="last"
      required /><br><br>
      <label for="phone" style="font-size:16pt">Phone Number</label><br>
      <input 
        v-model.number="phone" 
        type="number"
        placeholder="Phone Number"
      required /><br><br>
      <label for="email" style="font-size:16pt">Email Address</label><br>
      <input
        type="email"
        placeholder="Email address"
        v-model="email"
      required /><br><br>
      <label for="password" style="font-size:16pt">Password</label><br>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
      required /><br><br>
      <select v-model="education">
        <option disabled value="">Education Level</option>
        <option>Primary</option>
        <option>Secondary</option>
        <option>Junior College</option>
        <option>University</option>
      </select><br><br>
      <button type="submit" value="register">Register</button>
    </form>
</div>
</template>

<script>
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'RegisterStudent',
  data() {
    return {
      first:'',
      last:'',
      email: '',
      password: '',
      phone:'',
      education:'',
      image:''
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user.uid)
          db.collection("students").doc(user.user.uid).set({
            first_name: this.first,
            last_name: this.last,
            email: this.email,
            phone: this.phone,
            education: this.education,
            image: this.image
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

<style scoped>
h1 {
  font-size:24pt
}
input, select {
  height:40px;
  width:200 px;
  font-size: 14pt;
  margin:5px 0;
  padding:8px;
  border-radius:10px;
  box-shadow: 2px 1px
}

button {
  height:40px;
  width:100px;
  font-size: 14pt;
  background-color:aquamarine
}
</style>