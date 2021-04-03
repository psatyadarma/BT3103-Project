<template>
  <div style="text-align:center">
    <h1>Register Your Account</h1><br>
    <form @submit.prevent="register" style="background-color:#E6E6FA">
      <label for="first" style="font-size:16pt">First Name</label><br>
      <input
        type="text"
        placeholder="First Name"
        v-model="first"
      /><br><br>
      <label for="last" style="font-size:16pt">Last Name</label><br>
      <input
        type="text"
        placeholder="Last Name"
        v-model="last"
      /><br><br>
      <label for="phone" style="font-size:16pt">Phone Number</label><br>
      <input 
        v-model.number="phone" 
        type="number"
        placeholder="Phone Number"
      /><br><br>
      <label for="qualifications" style="font-size:16pt">Your Qualifications</label><br>
      <textarea 
        v-model="qualifications" 
        placeholder="Your qualifications"
      ></textarea><br><br>
      <label for="subjects" style="font-size:16pt">Subjects</label><br>
      <input
        type="text"
        placeholder="Subjects"
        v-model="subject"
      /><br><br>
      <label for="rates" style="font-size:16pt">Rates</label><br>
      <input 
        v-model.number="rates" 
        type="number"
        placeholder="Hourly Rate"
      /><br><br>
      <label for="qualifications" style="font-size:16pt">Your Available Days</label><br>
      <textarea 
        v-model="availability" 
        placeholder="Your available days"
      ></textarea><br><br>
      <label for="email" style="font-size:16pt">Email Address</label><br>
      <input
        type="email"
        placeholder="Email address"
        v-model="email"
      /><br><br>
      <label for="password" style="font-size:16pt">Password</label><br>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
      /><br><br>
      <button type="submit" value="register">Register</button>
    </form>
</div>
</template>

<script>
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'RegisterTutor',
  data() {
    return {
      first:'',
      last:'',
      email: '',
      password: '',
      qualifications:'',
      subject:'',
      rates:'',
      phone:'',
      availability:''
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          var tutorid = user.user.uid;
          console.log(tutorid);
          db.collection("profiles").doc(user.user.uid).set({
            first_name: this.first,
            last_name: this.last,
            email: this.email,
            qualifications: this.qualifications,
            subject: this.subject,
            rates: this.rates,
            phone:this.phone,
            rate:0,
            tutid:tutorid,
            availability:this.availability
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
  font-size: 24pt
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

textarea {
  height: 60px;
  width: 240px;
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