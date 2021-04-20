<template>
<body>
  <div id="wrapper">
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
    <br>
    <p class = "welcome"> {{"Welcome back, " + this.first_name + " " + this.last_name + "!"}}</p>
    <div class = "box">
        <p class = "heading"> Upcoming Lessons </p>
        <br>
        <ul class="class">
          <li class="item" v-for="event in this.events" v-bind:key="event.name">
            <p class="inline" id = "value">  {{ "Name: " + event.name }} </p> 
            <p class="inline" id = "value">  {{ "Details: " + event.details }} </p> 
            <p class="inline" id = "value">  {{ "Time: " + event.start + " to " + event.end}} </p> 
            <br>
          </li>
        </ul>  
        <br>
    </div>

      <div class = "box">
      <p class = "heading"> Timeslot Requests </p>
      <ul>
          <li class="item" v-for="request in this.requests" :key="request.id">
              <p>
                {{request.first_name}} {{request.last_name}}
                requested <br>
                Subject: {{request.subject}} <br>
                Timeslot: {{request.start}} - {{request.end}}
              </p>
                <button v-on:click="acceptRequest(request.stdid, request.start, request.end, request.subject)">Accept</button><br>
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
      requests:[],
      events: [],
      first_name: "",
      last_name: "",
      today: new Date().toISOString().substr(0, 10),
      //yesterday: new Date(new Date().setDate(new Date().getDate()-1)),
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
            let snapshot = await db.collection('calendar');
            snapshot.orderBy("end").get().then(querySnapshot => {
              querySnapshot.forEach((doc) => {
                let userid = doc.data().id;
                if (userid == user.uid) {
                  let appData = doc.data();
                  appData.id = doc.id;
                  //events.push(appData);
                  if (doc.data().end >= this.today) {
                    events.push(appData);
                  }
                }
                //events.sort();              
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
              db.collection('requests').doc(firebase.auth().currentUser.uid).collection('requests').get().then(snapshot => {
               snapshot.docs.forEach(doc => {
              this.requests.push(doc.data());
          });
      });
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

  body {
    background-image: url("../assets/background1.jpg");
    background-size: cover;
    height:100vh;
    overflow: hidden;
    //background-color: pink;
    //min-width: 80%;
    min-height: 800px;
  }

  #wrapper {
    text-align: center;
  }

  .welcome {
    text-align: left;
    padding-left: 150px;
    padding-top: 50px;
    color: white;
    font-weight: bold;
    font-size: 30px;
  }

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    color: white;
    font-family: Montserrat;
  }

  .box {
    background-color: #55C9C2;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 500px;
    width: 400px;  
    margin: 50px;
    margin-top: 50px;
    margin-left: 60px;
    padding-top: 30px;
    padding-left: 30px;
    font-family: Montserrat;
    line-height: 150%;
    font-size: 12px;
    overflow: auto;
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
  position: relative;
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

button {
  width: 80px;
  height: 20px;
  color: #3a938d;
  background: white;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
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
</style>
