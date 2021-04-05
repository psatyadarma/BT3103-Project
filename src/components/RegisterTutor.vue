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
      ></textarea><br>
      <p style="font-size:16pt">Teaching Level</p>
      <input type="checkbox" id="primary" value="primary" v-model="level" class="check">
      <label for="primary">Primary</label>
      <input type="checkbox" id="secondary" value="secondary" v-model="level" class="check">
      <label for="secondary">Secondary</label>
      <input type="checkbox" id="jc" value="jc" v-model="level" class="check">
      <label for="jc">JC</label>
      <input type="checkbox" id="university" value="university" v-model="level" class="check">
      <label for="university">University</label>
      <br><br><br>
      <label for="experience" style="font-size:16pt">Year of Experience</label><br>
      <input 
        v-model.number="experience" 
        type="number"
        placeholder="Year of Experience"
      /><br><br>
      <p style="font-size:16pt">Teaching Subjects</p>
      <input type="checkbox" id="mathematics" value="mathematics" v-model="subject" class="check">
      <label for="mathematics">Mathematics</label>
      <input type="checkbox" id="english" value="english" v-model="subject" class="check">
      <label for="english">English</label>
      <input type="checkbox" id="physics" value="physics" v-model="subject" class="check">
      <label for="physics">Physics</label>
      <input type="checkbox" id="chemistry" value="chemistry" v-model="subject" class="check">
      <label for="chemistry">Chemistry</label>
      <input type="checkbox" id="biology" value="biology" v-model="subject" class="check">
      <label for="biology">Biology</label>
      <br><br><br>
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
      subject:[],
      rates:'',
      phone:'',
      availability:'',
      experience:'',
      image:'',
      level:[]
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
            availability:this.availability,
            experience:this.experience,
            image:this.image,
            level:this.level
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

input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
  margin-right: 10px;
  margin-left: 20px;
}

/* Might want to wrap a span around your checkbox text */
.checkboxtext
{
  /* Checkbox text */
  font-size: 16pt;
  display: inline;
}

input:not(.check), select {
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