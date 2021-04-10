<template>
    <body>
  <nav>
  <ul style="list-style-type: none;">
  <li><router-link to="/HomeStudent">HomeStudent</router-link></li>
  <li><router-link to="/ProfileStudent">ProfileStudent</router-link></li>
  </ul>
  </nav>        
        <div class="profile">
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
            <p class="inline">  {{"Education Level: "}} </p>
            <p class="inline" id = "value"> {{ this.education}} </p>
            <br><br>
            <p class="inline">  {{"Profile Picture: "}} </p>
              <img v-bind:src="this.img">
            <br><br>
            <button v-on:click="updateProfile()">Update Profile</button>
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
      db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
        {
            var data = querySnapShot.data();
            this.first_name = data.first_name;
            this.last_name = data.last_name; 
            this.email = data.email;
            this.phone = data.phone;
            this.education = data.education;
            this.img = data.img;
        })
      }
};
</script>

<style scoped lang="scss">
  div {
    background-color: pink;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 600px;
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
  font-size: 16 px;
  border-color: white;
}

.inline {
  display: inline;
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
</style>