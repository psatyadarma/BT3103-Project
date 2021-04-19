<template>
    <body>
    <img :src="logo" />
    <div class="top">
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeStudent">Home</router-link></li>
          <li><router-link to="/ProfileTutor">Profile</router-link></li>
          <li><router-link to="/CalendarTutor">Calendar</router-link></li>
          <li><router-link to="/assignmentTutor">Assignment</router-link></li>
          <li><router-link to='/logout'>Logout</router-link></li>
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
            <p class="inline">First Name</p>
            <div class="test">
            <p class="value"> {{ this.first_name}} </p>
            </div>
            <br>
            <p class="inline">Last Name</p>
            <div class="test">
            <p class="value"> {{ this.last_name}} </p>
            </div>
            <br>
            <p class="inline">Email</p>
            <div class="test">
            <p class="value"> {{ this.email}} </p>
            </div>
            <br>
            <p class="inline">Phone</p>
            <div class="test">
            <p class="value"> {{ this.phone}} </p>
            </div>
            <br>
            <p class="inline">Qualifications</p>
            <div class="test">            
            <p class="value"> {{ this.qualifications}} </p>
            </div>
            <br>
            <p class="inline">Experience</p>
            <div class="test">            
            <p class="value"> {{ this.experience}} </p>
            </div>
            <br>
            <p class="inline">Subjects</p>
            <div class="test">
            <ul>
              <li v-for="subject in this.subject" v-bind:key="subject.name">
                <p class="value">  {{ subject }} </p> 
              </li>
            </ul>  
            </div>
            <br>
            <p class="inline">Teaching Level</p>
            <div class="test">
            <ul>
            <li v-for="level in this.level" v-bind:key="level.name">
                <p class="value">  {{ level }} </p> 
            </li>
            </ul>
            </div>
            <br>
            <p class="inline">Availability</p>
            <div class="test">
            <p class="value"> {{ this.availability}} </p>
            </div>
            <br>
            <p class="inline">Rates (per hour)</p>
            <div class="test">
              <p class="value"> {{ this.rates}} </p>
            </div>
            <br><br>
            <button id='button1' v-on:click="updateProfile()">Update Profile</button>
            <button id='button2' v-on:click="dashboard()">Dashboard</button>
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
  name: "ProfileTutor",
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
      }
  },
  async created(){
      await firebase.auth().onAuthStateChanged(user => {
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
    color: black;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box; 
    height: 1500px;
    width: 85%;  
    margin: 100px;
    padding-top: 50px;
    padding-left: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
    line-height: 150%;
    background: linear-gradient(180deg, #55C9C2 0%, #1D918A 100%), #DFEEEF;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    border-radius: 51px;
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
    position: absolute;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    border-radius: 20px;
    padding: 7px 35px;
    margin: 10px;
    color: #3a938d;
    background: white;
    cursor: pointer;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

button:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

#button1 {
    top: 570px;
    left: 920px;
}

#button2 {
    top: 635px;
    left: 935px;
}

.inline {
  display: inline;
  list-style-type: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin: 5px 0 10px 100px;
}

.profile {
    font-size: 20px;
  }

.value {
    display: inline;
    list-style-type: none;
    font-family: Montserrat;
    font-style: normal;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 10px 0 10px 50px;
    width: 200px;
    color: #2D7C77;
    font-weight: 600;
}

.pic {
  float: right;
  margin-right: 200px;
  margin-top: 60px;
  padding: 0;
  height: 190px;
  width: 190px;
  border-radius: 50%;
}

.rating {
  float: right;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin-right: -200px;
  margin-top: 280px;
}

ul {
  list-style-type: none;
}

.attributes {
  background-color: white;
  width: 500px;
  border-radius:10px;
  margin: 5px 0 5px 100px;
}

</style>