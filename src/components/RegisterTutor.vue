<template>
  <div style="text-align:center" class="formdiv">
    <h1>Register Your Account</h1><br>
    <form @submit.prevent="register">
      
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
      <label for="qualifications" style="font-size:16pt">Your Qualifications</label><br>
      <textarea 
        v-model="qualifications" 
        placeholder="Your qualifications"
      ></textarea><br>
      <p style="font-size:16pt">Teaching Level</p>
      <input type="checkbox" id="primary" value="Primary" v-model="level" class="check">
      <label for="primary">Primary</label>
      <input type="checkbox" id="secondary" value="Secondary" v-model="level" class="check">
      <label for="secondary">Secondary</label>
      <input type="checkbox" id="jc" value="JC" v-model="level" class="check">
      <label for="jc">JC</label>
      <input type="checkbox" id="university" value="University" v-model="level" class="check">
      <label for="university">University</label>
      <br><br><br>
      <label for="experience" style="font-size:16pt">Years of Experience</label><br>
      <input 
        v-model.number="experience" 
        type="number"
      min="0" max="60" oninput="validity.valid||(value='');"/><br><br>
      <p style="font-size:16pt">Teaching Subjects</p>
      <input type="checkbox" id="mathematics" value="Mathematics" v-model="subject" class="check">
      <label for="mathematics">Mathematics</label>
      <input type="checkbox" id="english" value="English" v-model="subject" class="check">
      <label for="english">English</label>
      <input type="checkbox" id="physics" value="Physics" v-model="subject" class="check">
      <label for="physics">Physics</label>
      <input type="checkbox" id="chemistry" value="Chemistry" v-model="subject" class="check">
      <label for="chemistry">Chemistry</label>
      <input type="checkbox" id="biology" value="Biology" v-model="subject" class="check">
      <label for="biology">Biology</label>
      <br><br><br>
      <label for="rates" style="font-size:16pt">Rates</label><br>
      <input 
        v-model.number="rates" 
        type="number"
        placeholder="Hourly Rate"
      min=0 oninput="validity.valid||(value='');" /><br><br>
      <label for="qualifications" style="font-size:16pt">Your Available Days</label><br>
      <textarea 
        v-model="availability" 
        placeholder="Your available days"
      required ></textarea><br><br>
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
      <button type="submit" value="register">Register</button>
    </form>
</div>
</template>

<script>
import firebase from "../firebase"
var db = firebase.firestore();

var pastThirtyDays = [];
for (let i=0; i < 30; i++) {
  var date = new Date(new Date().setDate(new Date().getDate() - i)).toDateString().slice(4);
  pastThirtyDays.push(date);
}
pastThirtyDays = pastThirtyDays.sort((a,b) => new Date(a) - new Date(b));

var clickHistory = {};
var viewHistory = {};

for (const date of pastThirtyDays) {
  clickHistory[date] = 0;
  viewHistory[date] = 0;
}

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
      level:[],
      engaging:[0,0,0,0,0,0,0,0,0,0],
      communication:[0,0,0,0,0,0,0,0,0,0],
      listening:[0,0,0,0,0,0,0,0,0,0],
      patience:[0,0,0,0,0,0,0,0,0,0],
      overall:[0,0,0,0,0]
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
            level:this.level,
            engaging:this.engaging,
            communication:this.communication,
            listening:this.listening,
            patience:this.patience,
            overall:this.overall,
            profileViews:0,
            contactClicks:0,
            createDate: new Date(),
            clickHistory: clickHistory,
            viewHistory: viewHistory,
            mystudents: [],
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
             console.error("Error writing document: ", error);
          });
          alert('Successfully registered!');
          
          this.$router.push('/homeTutor');
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

.formdiv {
  border-radius: 25px;
  border: 4px solid black;
  padding: 20px;
  background-image:linear-gradient(#55C9C2, white);
  width: 550px;
  margin: auto;
  border-style: outset;
  font-weight : bold;
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
  font-size: 18pt;
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

input,textarea:focus { 
  outline: none; 
}
</style>