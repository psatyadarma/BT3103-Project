<template>
    <body>
          <img :src="logo" />
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
  <h1 style="text-align:center; color:#55C9C2; font-weight: bold; padding-top:150px;" >EDIT YOUR PROFILE</h1>
  <div class = "editProfile">
    <form @submit.prevent="register">
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
      <p class="inline">  {{"Education Level: "}} </p>
      <select v-model="education" class="edu">
        <option disabled value="" class="value">Education Level</option>
        
        <option class="value" color="#2D7C77;">Primary</option>
        <option class="value">Secondary</option>
        <option class="value">Junior College</option>
        <option class="value">University</option>
      </select><br><br>
      <button v-on:click="update()">Save Changes</button>

            </form>
        </div>
    </body>
</template>

<script>
import logo from "../assets/logo2.png"
import firebase from "../firebase"
var db = firebase.firestore();
export default {
  name: "EditProfileStudent",
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
        logo: logo,
        first_name:null,
        last_name: null,
        phone: null,
        education: null,
        img: null,
        uploadValue: 0,
    }
  },
  methods:{
    update() {
      firebase.auth().onAuthStateChanged(user => {
      if (user!=null) {
        db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
          { querySnapShot.ref.update({
          first_name : this.first_name,
          last_name : this.last_name,
          phone : this.phone,
          education: this.education,
          img: this.img,
      })})
      }
      })
      setTimeout( () => this.$router.push('/ProfileStudent'), 800);
    },
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user!=null) {
      db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
        {
            var data = querySnapShot.data();
            this.first_name = data.first_name;
            this.last_name = data.last_name; 
            this.phone = data.phone;
            this.education = data.education;
        })
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
}

  .editProfile {
    background: linear-gradient(180deg, #55C9C2 0%, #1D918A 100%), #DFEEEF;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    color: black;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 600px;
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
  color: #FFFFFF;
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
    font-family: Montserrat;
}

.value {
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 5px;
    width: 200px;
    font-family: Montserrat;
    font-size: 24px;
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

.edu {
  background-color: white;
  border-radius: 10px;
  height: 25px;
  border-width: 1px;              
}

.attributes {
  background-color: white;
  width: 600px;
  border-radius:10px;
  height: 40px;
  padding-top: 8px;
}

</style>