<template>
<body>
  <img :src="logo" />
  <nav>
    <ul class="navbar" style="list-style-type: none;">
      <li><router-link to="/HomeStudent">Home</router-link></li>
      <li><router-link to="/ProfileStudent">Profile</router-link></li>
      <li><router-link to="/CalendarStudent">Calendar</router-link></li>
      <li><router-link to="/browseTutor">Browse Tutors</router-link></li>
      <li><router-link to="/assignmentStudent">Assignment</router-link></li>
      <li><router-link to='/logout'>Logout</router-link></li>
    </ul>
  </nav>
  <h1 class = "welcome"> {{"Welcome back, " + this.first_name + " " + this.last_name + "!"}}</h1>
  <div class = "reminders">
<<<<<<< HEAD
      <p class = "heading"> Upcoming Lessons </p>
      <br>
      <ul class="class">
        <li v-for="event in this.events" v-bind:key="event.name">
          <p class="inline" id = "value">  {{ "Name: " + event.name }} </p> 
          <p class="inline" id = "value">  {{ "Details: " + event.details }} </p> 
          <p class="inline" id = "value">  {{ "Time: " + event.start + " to " + event.end}} </p> 
          <br>
        </li>
      </ul>  
      <br>
<<<<<<< HEAD
   <div class = "requests">
=======
  </div>

    <div class = "requests">
>>>>>>> 5beb59b9470d4403b0ec830bdbfe936ed8dce1d5
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
<<<<<<< HEAD
  </div>
=======
=======
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
>>>>>>> 43c0ed00c760c80d4c31ea7aa56269caef9f5f55
>>>>>>> 5beb59b9470d4403b0ec830bdbfe936ed8dce1d5
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
<<<<<<< HEAD
        alert("Request accepted!");
=======
        alert("Request accepted!")
>>>>>>> 5beb59b9470d4403b0ec830bdbfe936ed8dce1d5
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
<<<<<<< HEAD
        alert("Request declined");
=======
        alert("Request declined")
>>>>>>> 5beb59b9470d4403b0ec830bdbfe936ed8dce1d5
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

  .welcome {
    text-align: left;
<<<<<<< HEAD
    padding-left: 150px;
    padding-top: 50px;
    color: white;
=======
    padding-left: 250px;
    padding-top: 120px;
    color: black;
>>>>>>> 43c0ed00c760c80d4c31ea7aa56269caef9f5f55
    font-weight: bold;
    font-size: 64px;
  }

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 25px;
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
    height: 500px;
    width: 400px;  
    margin: 10px;
    margin-top: 50px;
    margin-left: 20px;
    padding-top: 30px;
    padding-left: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
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

<<<<<<< HEAD
=======
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

>>>>>>> 43c0ed00c760c80d4c31ea7aa56269caef9f5f55
</style>
