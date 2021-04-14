<template>
<body>
  <nav>
  <ul style="list-style-type: none;">
  <li><router-link to="/HomeTutor">HomeTutor</router-link></li>
  <li><router-link to="/ProfileTutor">ProfileTutor</router-link></li>
  </ul>
  </nav>
  <div class = "reminders">
      <p class = "heading"> Reminders </p>
  </div>

  <div class = "classes">
    <p class = "heading"> Classes </p>
  </div>

  <div class = "requests">
    <p class = "heading"> Requests </p>
    <ul>
        <li v-for="request in this.requests" :key="request.id">
            <p>
              {{request.first_name}} {{request.last_name}}
              requested subject {{request.subject}} 
              timeslot {{request.start}} - {{request.end}}
            </p>
            <div class="buttons">
              <button v-on:click="acceptRequest(request.stdid, request.start, request.end, request.subject)">Accept</button>
              <button v-on:click="declineRequest(request.stdid, request.start, request.end, request.subject)">Decline</button>
            </div>
        </li>   
    </ul> 
  </div>  
  
  </body>
</template>

<script>
import firebase from "../firebase"
var db = firebase.firestore();
export default {
  name: "HomeTutor",
  props: {
    msg: String
  },
  data() {
    return {
      requests: []
    }
  },
  components:{
  },
  methods:{
      acceptRequest(userid, timeStart, timeEnd, subject) {
        db.collection("results").doc(userid)
        .collection("results").doc(firebase.auth().currentUser.uid).set({
          message: "Congratulations! your request for tutor " + this.first_name + 
          " " + this.last_name + " subject " + subject +
          " timeslot " + timeStart + " - " + timeEnd +
          " has been accepted"
        })
      },
      declineRequest(userid, timeStart, timeEnd, subject) {
        db.collection("results").doc(userid)
        .collection("results").doc(firebase.auth().currentUser.uid).set({
          message: "Unfortunately your request for tutor " + this.first_name + 
          " " + this.last_name + " subject " + subject +
          " timeslot " + timeStart + " - " + timeEnd +
          " has been rejected"
        })
      },
  },
  created() {
    db.collection('requests').doc(firebase.auth().currentUser.uid).collection('requests').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.requests.push(doc.data());
          });
      });
  }
};
</script>

<style scoped lang="scss">
  * {
  box-sizing: border-box;
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
    width: 500px;  
    margin: 50px;
    font-family: "Lucida Console", "Courier New", monospace;
  }

  .heading {
  color: white;
  text-align:center;
  font-size:50px;
  font-weight: bold;
  font-family: Montserrat;
  text-decoration: underline;
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

.buttons {
  display:inline;
}
</style>