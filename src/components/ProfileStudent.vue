<template>
  <body>
    <img id='logo' :src="logo" />
    <div class="top">
      <nav>
        <ul style="list-style-type: none;">
          <li><router-link to="/HomeStudent">Home</router-link></li>
          <li><router-link to="/ProfileStudent">Profile</router-link></li>
          <li><router-link to="/CalendarStudent">Calendar</router-link></li>
          <li><router-link to="/browseTutor">Browse Tutors</router-link></li>
          <li><router-link to="/assignmentStudent">Assignment</router-link></li>
          <li><router-link to='/logout'>Logout</router-link></li>
        </ul>
      </nav>       
    </div>        
    <div class="profile">
      <img class="pic" :src="profile" />  
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
      <p class="inline">Education Level</p>
      <div class="test">
      <p class="value"> {{ this.education}} </p>
      </div>
      <br>
      <button v-on:click="updateProfile()">Update Profile</button>
    </div>
  </body>
</template>

<script>
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
        logo: logo,
        profile: profile,
        first_name:null,
        last_name: null,
        email: null,
        phone: null,
        education: null,
        img: null,
    }
  },
  methods:{
      updateProfile() {
        this.$router.push('/EditProfileStudent');
      }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user!=null) {
      db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
        {
            var data = querySnapShot.data();
            this.first_name = data.first_name;
            this.last_name = data.last_name; 
            this.email = data.email;
            this.phone = data.phone;
            this.education = data.education;
            this.img = data.img;
        });
      } else {
          // No user is signed in.
      }
    })
  }
}
</script>

<style scoped lang="scss">

#logo {
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
    height: 780px;
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
    top: 590px;
    left: 960px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    border-radius: 90px;
    padding: 15px 35px;
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
  margin-right: 150px;
  margin-top: 130px;
  height: 175px;
  width: 190px;
  border-radius: 50%;
}

ul {
  list-style-type: none;
}

.test {
  background-color: white;
  width: 500px;
  border-radius:10px;
  margin: 5px 0 5px 100px;
}

</style>