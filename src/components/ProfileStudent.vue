<template>
    <body>
    <img :src="logo" />
    <div class="top">
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeStudent">Home</router-link></li>
          <li><router-link to="/ProfileStudent">Profile</router-link></li>
          <li><router-link to="/CalendarStudent">Calendar</router-link></li>
          </ul>
        </nav>       
      </div>        
        <div class="profile">
            <img class="pic" :src="profile" />  
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
            <p class="inline">  {{"Education Level: "}} </p>
            <div class="test">
            <p class="inline" id = "value"> {{ this.education}} </p>
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
    height: 600px;
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

ul {
  list-style-type: none;
}

.test {
  background-color: white;
  width: 500px;
  border-radius:10px;
}
</style>