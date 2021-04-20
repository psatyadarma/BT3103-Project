<template>
    <body>
          <img :src="logo" />
  <nav>
    <ul class="navbar" style="list-style-type: none;">
      <li><router-link to="/HomeTutor">Home</router-link></li>
      <li><router-link to="/ProfileTutor">Profile</router-link></li>
      <li><router-link to="/CalendarTutor">Calendar</router-link></li>
      <li><router-link to="/assignmentTutor">Assignment</router-link></li>
      <li><router-link to='/logout'>Logout</router-link></li>
    </ul>
  </nav>
  <h1 style="text-align:center; color:#55C9C2; font-weight: bold; padding-top:150px;" >EDIT YOUR PROFILE</h1>
  <div class="editProfile">
    <form @submit.prevent="register">
        <img class="pic" :src="profile" />
        <br>
      <p class="inline">  {{"First Name: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="First Name" maxlength="50" v-model="first_name"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Last Name: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Last Name" maxlength="50" v-model="last_name"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Phone: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Phone" maxlength="50" v-model="phone"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Qualifications: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Qualifications" maxlength="50" v-model="qualifications"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Experience: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Experience" maxlength="50" v-model="experience"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Rates: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Rates" maxlength="50" v-model="rates"/><br><br>
      </div>
      <br>
      <p class="inline">  {{"Subjects: "}} </p>
      <div class="attributes">
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
      </div>
      <br>
      <p class="inline">  {{"Teaching Level: "}} </p>
      <div class="attributes">
      <input type="checkbox" id="Primary" value="Primary" v-model="level" class="check">
      <label for="Primary">Primary</label>
      <input type="checkbox" id="Secondary" value="Secondary" v-model="level" class="check">
      <label for="Secondary">Secondary</label>
      <input type="checkbox" id="Junior College" value="Junior College" v-model="level" class="check">
      <label for="Junior College">Junior College</label>
      <input type="checkbox" id="University" value="University" v-model="level" class="check">
      <label for="University">University</label>
      </div>
      <br>     
      <p class="inline">  {{"Availability: "}} </p>
      <div class="attributes">
      <input type="text" class="value" placeholder="Availability" maxlength="50" v-model="availability"/><br><br>
      </div>
      <br>
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

  .editProfile {
    background: linear-gradient(180deg, #55C9C2 0%, #1D918A 100%), #DFEEEF;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    border-radius: 51px;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 1100px;
    width: 1000px;  
    margin: 120px;
    padding-top: 50px;
    padding-left: 20px;
    font-family: Montserrat;
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
  color: #3a938d;
  background: white;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border-width: 1px;
  font-weight: bold;
  font-size: 20px;
  border-color: white;
  margin: 10px;
  font-weight: bold;
  font-family: Montserrat;
  line-height: normal;
}

  button:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

.inline {
  display: inline;
  list-style-type: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
  margin: 5px 0 10px ;
}

.value {
    display: inline;
    list-style-type: none;
    font-family: Montserrat;
    font-style: normal;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 10px 0 10px 10px;
    width: 200px;
    color: #2D7C77;
    font-weight: 600;
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

.attributes {
  background-color: white;
  width: 600px;
  border-radius:10px;
  height: 40px;
  padding-top: 8px;
}

label {
  color: #2D7C77;
  font-weight:bold;
}
</style>