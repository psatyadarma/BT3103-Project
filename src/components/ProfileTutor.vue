<template>
    <body>
        <nav>
            <ul style="list-style-type: none;">
            <li><router-link to="/HomeTutor">HomeTutor</router-link></li>
            <li><router-link to="/ProfileTutor">ProfileTutor</router-link></li>
            </ul>
        </nav>          
        <div class="profile">
            <p class="inline" id="pic">  {{"Profile Picture: "}} </p>
              <img v-bind:src="this.img">
            <br><br>          
            <p class="inline">  {{"First Name: "}} </p>
            <p class="inline" id = "value"> {{ this.first_name}} </p>
            <br><br>
            <p class="inline">  {{"Last Name: "}} </p>
            <p class="inline" id = "value"> {{ this.last_name}} </p>
            <br><br>
            <p class="inline">  {{"Email: "}} </p>
            <p class="inline" id = "value"> {{ this.email}} </p>
            <br><br>
            <p class="inline">  {{"Phone: "}} </p>
            <p class="inline" id = "value"> {{ this.phone}} </p>
            <br><br>
            <p class="inline">  {{"Qualifications: "}} </p>
            <p class="inline" id = "value"> {{ this.qualifications}} </p>
            <br><br>
            <p class="inline">  {{"Experience: "}} </p>
            <p class="inline" id = "value"> {{ this.experience}} </p>
            <br><br>
            <p class="inline">  {{"Rates (per hour): "}} </p>
            <p class="inline" id = "value"> {{ this.rates}} </p>
            <br><br>
              <p class="inline" v-if='this.rate == 1'>Rating: ⭐</p>
              <p class="inline" v-else-if='this.rate == 2'>Rating: ⭐⭐</p>
              <p class="inline" v-else-if='this.rate == 3'>Rating: ⭐⭐⭐</p>
              <p class="inline" v-else-if='this.rate == 4'>Rating: ⭐⭐⭐⭐</p>
              <p class="inline" v-else-if='this.rate == 5'>Rating: ⭐⭐⭐⭐⭐</p>
            <br><br>
            <p class="inline">  {{"Subjects: "}} </p>
            <ul>
              <li v-for="subject in this.subject" v-bind:key="subject.name">
                <p class="inline" id = "value">  {{ subject }} </p> 
              </li>
            </ul>  
            <br>
            <p class="inline">  {{"Teaching Level: "}} </p>
            <ul>
            <li v-for="level in this.level" v-bind:key="level.name">
                <p class="inline" id = "value">  {{ level }} </p> 
            </li>
            </ul>
            <br>
            <p class="inline">  {{"Availability: "}} </p>
            <p class="inline" id = "value"> {{ this.availability}} </p>
            <br><br><br>
            <button v-on:click="updateProfile()">Update Profile</button>
            <button v-on:click="dashboard()">Dashboard</button>
        </div>
    </body>
</template>

<script>
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
        picked: "",
        first_name:null,
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
    }
  },
  methods:{
      updateProfile() {
        this.$router.push('/EditProfileTutor');
      },
      dashboard() {
        this.$router.push('dashboard');
      },
  },
  created(){
      var user = firebase.auth().currentUser
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
        });
    }
};
</script>

<style scoped lang="scss">
  div {
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
  font-size: 16 px;
  border-color: white;
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

#pic {
  float: right;
  margin-right: 20px;
}

ul {
  list-style-type: none;
}
</style>