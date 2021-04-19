<template>
<body>
      <img :src="logo" />
  <nav>
  <ul class="navbar" style="list-style-type: none;">
  <li><router-link to="/HomeTutor">Home</router-link></li>
  <li><router-link to="/ProfileTutor">Profile</router-link></li>
  <li><router-link to="/CalendarTutor">Calendar</router-link></li>
  </ul>
  </nav>
  <p class = "welcome"> {{"Welcome back, " + this.first_name + " " + this.last_name + "!"}}</p>
  <div class = "reminders">
      <p class = "heading"> Upcoming Lessons </p>
      <br><br>
      <ul class="class">
        <li v-for="event in this.events" v-bind:key="event.name">
          <p class="inline" id = "value">  {{ "Name: " + event.name }} </p> 
          <p class="inline" id = "value">  {{ "Details: " + event.details }} </p> 
          <p class="inline" id = "value">  {{ "Time: " + event.start + " to " + event.end}} </p> 
          <br>
        </li>
      </ul>  
      <br>
   <div class = "requests">
    <p class = "heading"> Timeslot Requests </p>
    <ul>
        <li v-for="request in this.requests" :key="request.id">
            <p>
              {{request.first_name}} {{request.last_name}}
              requested subject {{request.subject}} 
              timeslot {{request.start}} - {{request.end}}
            </p>
              <button v-on:click="acceptRequest(request.stdid, request.start, request.end, request.subject)">Accept</button>
              <button v-on:click="declineRequest(request.stdid, request.start, request.end, request.subject)">Decline</button>
            
        </li>   
    </ul> 
  </div>
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
    acceptRequest(userid, timeStart, timeEnd, subject) {
        db.collection("results").doc(userid)
        .collection("results").doc(firebase.auth().currentUser.uid).set({
          message: "Congratulations! your request for tutor " + this.first_name + 
          " " + this.last_name + " subject " + subject +
          " timeslot " + timeStart + " - " + timeEnd +
          " has been accepted"
        });
        alert("Request accepted!");
        var user = firebase.auth().currentUser;
        db.collection("requests").doc(user.uid).
        collection("requests").doc(userid).delete();
      },
      declineRequest(userid, timeStart, timeEnd, subject) {
        db.collection("results").doc(userid)
        .collection("results").doc(firebase.auth().currentUser.uid).set({
          message: "Unfortunately your request for tutor " + this.first_name + 
          " " + this.last_name + " subject " + subject +
          " timeslot " + timeStart + " - " + timeEnd +
          " has been rejected"
        });
        alert("Request declined");
        var user = firebase.auth().currentUser;
        db.collection("requests").doc(user.uid).
        collection("requests").doc(userid).delete();
      },
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
    padding-top: 100px;
    color: black;
    font-weight: bold;
    font-size: 30px;
  }

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    color: white;
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

.class li:nth-child(3) a {
  background: white;
}

</style>
