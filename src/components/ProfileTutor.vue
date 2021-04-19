<template>
    <body>
    <img :src="logo" />
    <div class="top">
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeTutor">Home</router-link></li>
          <li><router-link to="/ProfileTutor">Profile</router-link></li>
          <li><router-link to="/CalendarTutor">Calendar</router-link></li>
          </ul>
        </nav>       
      </div>   
        <div class="profile">
            <img class="pic" :src="profile" />            
              <p class="rating" v-if='this.rate == 1'>Rating: ⭐</p>
              <p class="rating" v-else-if='this.rate == 2'>Rating: ⭐⭐</p>
              <p class="rating" v-else-if='this.rate == 3'>Rating: ⭐⭐⭐</p>
              <p class="rating" v-else-if='this.rate == 4'>Rating: ⭐⭐⭐⭐</p>
              <p class="rating" v-else-if='this.rate == 5'>Rating: ⭐⭐⭐⭐⭐</p>
            <br>
            <p class="rates1">  {{"Rates (per hour): "}} </p>
            <p class="rates2" id = "value"> {{ this.rates}} </p>

            <p class="inline">  {{"First Name: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.first_name}} </p>
            </div>
            <br>
            <p class="inline">  {{"Last Name: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.last_name}} </p>
            </div>
            <br>
            <p class="inline">  {{"Email: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.email}} </p>
            </div>
            <br>
            <p class="inline">  {{"Phone: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.phone}} </p>
            </div>
            <br>
            <p class="inline">  {{"Qualifications: "}} </p>
            <div class="test">            
            <p class="inline" id = "value"> {{ this.qualifications}} </p>
            </div>
            <br>
            <p class="inline">  {{"Experience: "}} </p>
            <div class="test">            
            <p class="inline" id = "value"> {{ this.experience}} </p>
            </div>
            <br>
            <p class="inline">  {{"Subjects: "}} </p>
            <div class="test">
            <ul>
              <li v-for="subject in this.subject" v-bind:key="subject.name">
                <p class="inline" id = "value">  {{ subject }} </p> 
              </li>
            </ul>  
            </div>
            <br>
            <p class="inline">  {{"Teaching Level: "}} </p>
            <div class="test">
            <ul>
            <li v-for="level in this.level" v-bind:key="level.name">
                <p class="inline" id = "value">  {{ level }} </p> 
            </li>
            </ul>
            </div>
            <br>
            <p class="inline">  {{"Availability: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.availability}} </p>
            </div>
            <br><br>
            <button v-on:click="updateProfile()">Update Profile</button>
            <button v-on:click="dashboard()">Dashboard</button>
        </div>
    </body>
</template>

<script>
//import image from "../assets/stamp.jpg"
import logo from "../assets/logo2.png"
import profile from "../assets/profile.jpg"
import firebase from "../firebase"
var db = firebase.firestore();
export default {
  name: "profile",
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
        profile:profile,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        qualifications: null,
        rate:null,
        rates: null,
        level: null,
        subject: null,
        experience: null,
        availability: null,
        img: null,
        logo:logo,
    }
  },
  methods:{
      updateProfile() {
        this.$router.push('/EditProfileTutor');
      },
      dashboard() {
        this.$router.push('dashboard');
      }
  },
  created(){
      firebase.auth().onAuthStateChanged(user => {
          if (user!=null) {
            db.collection('profiles').doc(user.uid).get().then((querySnapShot)=>
              {
                  var data = querySnapShot.data();
                  this.first_name = data.first_name;
                  this.last_name = data.last_name; 
                  this.email = data.email;
                  this.phone = data.phone;
                  this.qualifications = data.qualifications;
                  this.experience = data.experience;
                  this.rates = data.rates;
                  this.rate = data.rate;
                  this.subject = data.subject,
                  this.level = data.level;
                  this.availability = data.availability;
                  this.img = data.img;
              })
          } else {
            // No user is signed in.
          }
      })
  }
};
</script>

<style scoped lang="scss">
img {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

  .top {
    background-color: #55C9C2;
  }

  .profile {
    background-color: #55C9C2;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 1200px;
    width: 1000px;  
    margin: 100px;
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
  margin: 10px;
}

.inline {
  display: inline;
  list-style-type: none,
}

.profile {
    font-size: 20px;
  }

#value {
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 5px;
    width: 200px;

}

.pic {
  float: right;
  margin-right: 100px;
  margin-top: 10px;
  height: 150px;
  width: 200px;
}

.rating {
  float: right;
  margin-right: -180px;
  margin-top: 170px;  
}

.rates1 {
  float: right;
  margin-right: -220px;
  margin-top: 200px;  
}

.rates2 {
  float: right;
  margin-right: -220px;
  margin-top: 250px;  
}

ul {
  list-style-type: none;
}

.test {
  background-color: white;
  width: 500px;
  border-radius:10px;
}
</style>