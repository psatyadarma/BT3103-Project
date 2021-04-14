<template>
  <div style="text-align:center">
    <h1>Timeslot Request</h1><br>
    <form @submit.prevent="request" style="background-color:#E6E6FA">
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
      <label for="end" style="font-size:16pt">Start Time</label><br>
      <input
        type="time"
        v-model="end"
      required /><br><br>
      <button type="submit" value="register">Create Request</button>
    </form>
  </div>
</template>

<script>
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
      requests:[]
    }
  },
  props: {
    tutid: {
      type: String
    }
  },
  methods: {
    request() {
        var user = firebase.auth().currentUser;
        db.collection("requests").doc(user.uid).
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

button {
  height:40px;
  width:150px;
  font-size: 14pt;
  background-color:aquamarine
}

.buttons {
  display: inline;
}
</style>