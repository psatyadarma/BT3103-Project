<template>
    <body>
    <img :src="logo" />
    <div class="top">
  <nav>
    <ul class="navbar" style="list-style-type: none;">
      <li><router-link to="/HomeTutor">Home</router-link></li>
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
            <p class="rates1">  {{"Rates (per hour): "}} </p>
            <p class="rates2" id = "value"> {{ this.rates}} </p>

            <p class="inline">  {{"First Name: "}} </p>
            <div class="attributes">
            <p class="inline" id = "value"> {{ this.first_name}} </p>
            </div>
            <br>
            <p class="inline">  {{"Last Name: "}} </p>
            <div class="attributes">
            <p class="inline" id = "value"> {{ this.last_name}} </p>
            </div>
            <br>
            <p class="inline">  {{"Email: "}} </p>
            <div class="attributes">
            <p class="inline" id = "value"> {{ this.email}} </p>
            </div>
            <br>
            <p class="inline">  {{"Phone: "}} </p>
            <div class="attributes">
            <p class="inline" id = "value"> {{ this.phone}} </p>
            </div>
            <br>
            <p class="inline">  {{"Qualifications: "}} </p>
            <div class="attributes">            
            <p class="inline" id = "value"> {{ this.qualifications}} </p>
            </div>
            <br>
            <p class="inline">  {{"Experience: "}} </p>
            <div class="attributes">            
            <p class="inline" id = "value"> {{ this.experience}} </p>
            </div>
            <br>
            <p class="inline">  {{"Subjects: "}} </p>
            <div class="attributes">
            <ul>
              <li v-for="subject in this.subject" v-bind:key="subject.name">
                <p class="inline" id = "value">  {{ subject }} </p> 
              </li>
            </ul>  
            </div>
            <br>
            <p class="inline">  {{"Teaching Level: "}} </p>
            <div class="attributes">
            <ul>
            <li v-for="level in this.level" v-bind:key="level.name">
                <p class="inline" id = "value">  {{ level }} </p> 
            </li>
            </ul>
            </div>
            <br>
            <p class="inline">  {{"Availability: "}} </p>
            <div class="attributes">
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
      },
      dashboard() {
        this.$router.push('/dashboard')
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
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 1800px;
    width: 1000px;  
    margin: 20px;
    padding-top: 20px;
    padding-left: 20px;
    font-family: Montserrat;
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

.profile {
    font-size: 20px;
  }

#value {
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
  margin-right: -180px;
  margin-top: 200px;  
  font-family: Montserrat;
  color: #FFFFFF; 
}

.rates2 {
  float: right;
  margin-right: -220px;
  margin-top: 250px;  

}

ul {
  list-style-type: none;
}

.attributes {
  background-color: white;
  width: 500px;
  border-radius:10px;
  margin-top: 10px;
}
</style>