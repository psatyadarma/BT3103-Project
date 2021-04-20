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
  <h1 class = "welcome"> {{"Welcome back, " + this.first_name + " " + this.last_name + "!"}}</h1>
  <div class = "reminders">
    <p class = "heading"><u>Upcoming Lessons</u></p>
    <br>
    <br>
    <ul class="class">
      <li class='item' v-for="event in this.events" v-bind:key="event.name">
        <p class="inline" id = "value">  {{ "Name: " + event.name }} </p> 
        <p class="inline" id = "value">  {{ "Details: " + event.details }} </p> 
        <p class="inline" id = "value">  {{ "Time: " + event.start + " to " + event.end}} </p> 
        <br>
      </li>
    </ul>  
    <br>
  </div>
  </body>
</template>

<script>
import logo from "../assets/logo2.png"
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: "HomeTutor",
  props: {
    msg: String
  },
  components:{
  },
  data(){
    return {
      logo: logo,
      events: [],
      first_name: "",
      last_name: "",
      today: new Date().toISOString().substr(0, 10),
      yesterday: new Date(new Date().setDate(new Date().getDate()-1)),
    }
  },
  methods: {
    async getEvents() {
    firebase.auth().onAuthStateChanged(async user => {
        if (user!=null) {
            let events = [];
            let snapshot = await db.collection('calendar').where("end", ">=", this.today).orderBy("end").limit(6);
            //console.log(this.yesterday);
            snapshot.get().then(querySnapshot => {
              querySnapshot.forEach((doc) => {
                let userid = doc.data().id;
                if (userid == user.uid) {
                  let appData = doc.data();
                  appData.id = doc.id;
                  events.push(appData);
                }
              });
            })
            this.events = events;
        }
        else {
            //not the user 
        }})
    },
  },
  mounted() {
    this.getEvents();
  },
    created(){
      firebase.auth().onAuthStateChanged(user => {
          if (user!=null) {
            db.collection('profiles').doc(user.uid).get().then((querySnapShot)=>
              {
                  var data = querySnapShot.data();
                  this.first_name = data.first_name;
                  this.last_name = data.last_name; 
              })
          } else {
            // No user is signed in.
          }
      })
  },
}

</script>

<style scoped lang="scss">
  * {
  box-sizing: border-box;
  }

  .welcome {
    text-align: left;
    padding-left: 250px;
    padding-top: 120px;
    color: black;
    font-weight: bold;
    font-size: 64px;
  }

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    color: white;
    font-family: Montserrat;
  }

  div {
    background-color: #55C9C2;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 600px;
    width: 800px;  
    margin: 100px;
    margin-top: 50px;
    margin-left: 250px;
    padding-top: 30px;
    padding-left: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
    line-height: 150%;
    
  }

img {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
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

ul {
  list-style-type: none;
}

.item {
  background: linear-gradient(180deg, #80FFE8 0%, rgba(106, 228, 255, 0.71) 100%);
  border-radius: 35px;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px 15px 20px 0px;
}

.item p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.class li:nth-child(3) a {
  background: white;
}

</style>
