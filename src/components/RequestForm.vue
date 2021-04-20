<template>
  <div>
  <img id="logo" :src="logo" />
    <nav>
      <ul class="navbar" style="list-style-type: none;">
        <li><router-link to="/homeStudent">Home</router-link></li>
        <li><router-link to="/profileStudent">Profile</router-link></li>
        <li><router-link to="/calendarStudent">Calendar</router-link></li>
        <li><router-link to="/assignmentStudent">Assignment</router-link></li>
        <li><router-link to='/logout'>Logout</router-link></li>
      </ul>
    </nav>
  <div style="text-align:center" class="formdiv">
    <h1>Timeslot Request</h1><br>
    <form @submit.prevent="request">
      <label for="subject" style="font-size:16pt">Subject</label><br>
      <input
        type="text"
        placeholder="Subject"
        v-model="subject"
      required /><br><br>
      <label for="start" style="font-size:16pt">Start Time</label><br>
      <input
        type="time"
        v-model="start"
      required /><br><br>
      <label for="end" style="font-size:16pt">End Time</label><br>
      <input
        type="time"
        v-model="end"
      required /><br><br>
      <button type="submit" value="register">Create Request</button>
    </form>
    <button v-on:click="$router.go(-1)">Go Back</button>
  </div>
  </div>
</template>

<script>
import logo from "../assets/logo2.png"
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'RequestForm',
  data() {
    return {
      subject:'',
      start:'',
      end:'',
      first_name:'',
      last_name:'',
      phone:'',
      requests:[],
      logo:logo
    }
  },
  props: {
    tutid: {
      type: String
    }
  },
  methods: {
    request() {
        console.log(this.tutid);
        var user = firebase.auth().currentUser;
        db.collection("requests").doc(this.tutid).
        collection("requests").doc(user.uid).set({
          subject: this.subject,
          start: this.start,
          end: this.end,
          stdid: user.uid,
          phone: this.phone,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(function() {
        console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        alert('Successfully created request!');
        
        console.log("requests:")
        console.log(this.requests[0]['end'])

        //this.$router.push('/homeStudent');
    },
    acceptRequest(uid) {
      console.log(uid)
    }
  },
  created() {
    db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
    {
        var data = querySnapShot.data();
        this.first_name = data.first_name;
        this.last_name = data.last_name; 
        this.phone = data.phone;
    });
    db.collection('requests').doc(firebase.auth().currentUser.uid).collection('requests').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.requests.push(doc.data());
          });
      });
  }
}
</script>

<style scoped>
h1 {
  font-size: 24pt
}

input:not(.check), select {
  height:40px;
  width:200 px;
  font-size: 14pt;
  margin:5px 0;
  padding:8px;
  border-radius:10px;
  box-shadow: 2px 1px
}

textarea {
  height: 60px;
  width: 240px;
  font-size: 14pt;
  margin:5px 0;
  padding:8px;
  border-radius:10px;
  box-shadow: 2px 1px
}

.formdiv {
  border-radius: 25px;
  border: 4px solid black;
  padding: 20px;
  background-image:linear-gradient(#55C9C2, white);
  width: 400px;
  margin: auto;
}
h1 {
  font-size:24pt
}
input, select {
  height:40px;
  width:200 px;
  font-size: 14pt;
  margin:5px 0;
  padding:8px;
  border-radius:10px;
  box-shadow: 2px 1px
}

button {
  height:40px;
  width:150px;
  font-size: 14pt;
  background-color:aquamarine
}

input:focus { 
  outline: none; 
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

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

button {
  width: 200px;
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

</style>