<template>
    <body>
          <img :src="logo" />
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeTutor">Home</router-link></li>
          <li><router-link to="/ProfileTutor">Profile</router-link></li>
          <li><router-link to="/CalendarTutor">Calendar</router-link></li>
          </ul>
        </nav>
  <div class="editProfile">
    <form @submit.prevent="register">
        <img class="pic" :src="profile" />
        <br><br>
      <p class="inline">  {{"First Name: "}} </p>
      <input type="text" placeholder="First Name" maxlength="50" v-model="first_name"/><br><br>
      <p class="inline">  {{"Last Name: "}} </p>
      <input type="text" placeholder="Last Name" maxlength="50" v-model="last_name"/><br><br>
      <p class="inline">  {{"Phone: "}} </p>
      <input type="text" placeholder="Phone" maxlength="50" v-model="phone"/><br><br>
      <p class="inline">  {{"Qualifications: "}} </p>
      <input type="text" placeholder="Qualifications" maxlength="50" v-model="qualifications"/><br><br>
      <p class="inline">  {{"Experience: "}} </p>
      <input type="text" placeholder="Experience" maxlength="50" v-model="experience"/><br><br>
      <p class="inline">  {{"Rates: "}} </p>
      <input type="text" placeholder="Rates" maxlength="50" v-model="rates"/><br><br>

      <p class="inline">  {{"Subjects: "}} </p>
      <input type="checkbox" id="Mathematics" value="Mathematics" v-model="subject" class="check">
      <label for="Mathematics">Mathematics</label>
      <input type="checkbox" id="English" value="English" v-model="subject" class="check">
      <label for="English">English</label>
      <input type="checkbox" id="Physics" value="Physics" v-model="subject" class="check">
      <label for="Physics">Physics</label>
      <input type="checkbox" id="Chemistry" value="Chemistry" v-model="subject" class="check">
      <label for="Chemistry">Chemistry</label>
      <input type="checkbox" id="Biology" value="Biology" v-model="subject" class="check">
      <label for="Biology">Biology</label>
      <br>
      <br><br>
      <p class="inline">  {{"Teaching Level: "}} </p>
      <input type="checkbox" id="Primary" value="Primary" v-model="level" class="check">
      <label for="Primary">Primary</label>
      <input type="checkbox" id="Secondary" value="Secondary" v-model="level" class="check">
      <label for="Secondary">Secondary</label>
      <input type="checkbox" id="Junior College" value="Junior College" v-model="level" class="check">
      <label for="Junior College">Junior College</label>
      <input type="checkbox" id="University" value="University" v-model="level" class="check">
      <label for="University">University</label>
      <br><br>     
      <p class="inline">  {{"Availability: "}} </p>
      <input type="text" placeholder="Availability" maxlength="50" v-model="availability"/><br><br>
      

      <button v-on:click="update()">Save Changes</button>

            </form>
        </div>
    </body>
</template>

<script>
import logo from "../assets/logo2.png"
import profile from "../assets/profile.jpg"
import firebase from "../firebase"
var db = firebase.firestore();
export default {
  name: "EditProfileTutor",
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
        logo: logo,
        profile:profile,
        first_name:null,
        last_name: null,
        phone: null,
        qualifications: null,
        experience: null,
        rates: null,
        level: [],
        subject: [],
        availability: null,
        tutid: null,
        img: null,
        uploadValue: 0,
    }
  },
  methods:{
    update() {
      firebase.auth().onAuthStateChanged(user => {
          if (user!=null) {
              db.collection('profiles').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
                  { querySnapShot.ref.update({
                  first_name: this.first_name,
                  last_name: this.last_name,
                  phone: this.phone,
                  experience: this.experience,
                  rates: this.rates,
                  qualifications: this.qualifications,
                  subject: this.subject,
                  level: this.level,
                  availability: this.availability,
              })})
          } else {
            // not user
          }
      });
      setTimeout( () => this.$router.push('/ProfileTutor'), 800);
      
    },
    },
  created(){
      firebase.auth().onAuthStateChanged(user => {
          if (user!=null) {
            db.collection('profiles').doc(user.uid).get().then((querySnapShot)=>
            {
              var data = querySnapShot.data();
              this.first_name = data.first_name;
              this.last_name = data.last_name; 
              this.phone = data.phone;
              this.qualifications = data.qualifications;
              this.experience = data.experience;
              this.rates = data.rates;
              this.tutid = data.tutid,
              this.subject = data.subject;
              this.level = data.level;
              this.availability = data.availability;
            })
          } else {
            // No user is signed in.
          }
      })
  }
}
</script>

<style scoped lang="scss">
img {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
}

  div {
    background-color: #55C9C2;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 800px;
    width: 1000px;  
    margin: 120px;
    padding-top: 50px;
    padding-left: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
    line-height: 150%;
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

button {
  width: 150px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
  border-color: white;
}

.inline {
  display: inline;
}

.editProfile {
    font-size: 20px;
}

input {
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 5px;
    height: 25px;
}

.pic {
  float: right;
  margin-right: 100px;
  margin-top: 10px;
  height: 150px;
  width: 200px;
}
</style>