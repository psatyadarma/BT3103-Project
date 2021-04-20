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
    </ul>
    </nav>

    <div id='full'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <button id='assgn' @click="$router.push('/assignmentStudent')">Assignment</button>
        <button id='record'>Recording</button>
        <button id='upload' @click="$router.push('/uploadStudent')">Upload File</button>
        
        <div id='headings'>
            <label id='uploadDate'>Upload Date</label>
            <label id='subject'>Subject</label>
            <label id='tut'>Tutor</label>
            <label id='title'>Title</label>
            <hr id='linebreak'>
        </div>

        <div id='assignmentList'>
            <ul id='assgnlist'>
                <li id='listElement' v-for="assgn in sortedAssignments" :key="generateKey(assgn.uploadDate, assgn.id)">
                    <span id='dateList'>{{assgn.uploadDate}} </span>
                    <span id='tutorList'>{{assgn.tutorName}}</span>
                    <span id='subjectList'>{{assgn.subject}} </span>
                    <span id='titleList'>{{assgn.title}} </span>
                    <button id='downloadBtn' @click.prevent="download(assgn.uploadURL, assgn.title)"><i class="fa fa-download"></i></button>
                    <button id='trashBtn' @click.prevent="deleteFile(assgn.id,assgn.uploadURL)"><i class="fa fa-trash"></i></button>
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
  name: 'RecordingStudent',
  data() {
      return {
          logo: logo,
          thisUserId: firebase.auth().currentUser.uid,
          allAssignments: [],
          sorted:[], 
      };
  },
  computed: {
      sortedAssignments: function() {
          return this.allAssignments.slice().sort((a,b) => a.dateObject - b.dateObject)
      }
  },
  methods: {
      fetchAssignments: function() {
          db.collection('student_recordings').where("student", "==", this.thisUserId).get().then((querySnapShot)=> {
            let assignment = {}
            querySnapShot.forEach((doc) => {
                  assignment = doc.data()
                  assignment.id = doc.id
                  assignment.dateObject = new Date(assignment.uploadDate)

                  db.collection('profiles').doc(assignment.tutor).get().then((snapshot)=> {
                    let tutor = {}
                    tutor = snapshot.data()
                    assignment.tutorName = tutor.first_name + ' ' + tutor.last_name

                    this.allAssignments.push(assignment)
                    })
                  
            })
          })
      },

      download: function(link, header) {
          const storageRef = firebase.storage().ref();
          storageRef.child(link).getDownloadURL()
              .then((url) => {
                console.log(url)
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = () => {
                  var blob = xhr.response;
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = header;
                  link.click();
                  URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
            })
      },

      deleteFile: function(id, link) {
          db.collection('student_recordings').doc(id).delete().then(() => {
            firebase.storage().ref().child(link).delete().then(() => {
                alert('File deleted successfully')

                location.reload()
                this.fetchAssignments()
            })
          })   
      },

      generateKey: function(date, id) {
      const uniqueKey = `${date}-${id}`;
      return uniqueKey;
      },

      getTutor:function(id) {
          db.collection('profiles').doc(id).get().then((querySnapShot)=> {
              console.log("id:" ,id)
              let tutor = {}
              tutor = querySnapShot.data()
              var name = tutor.first_name
              console.log("name: ",name)
              return name
          })
      }

  },

  created() {
      this.fetchAssignments()
  },

}

</script>


<style scoped>

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

#full {
    position: absolute;
    width: 1418px;
    height: 600px;
    left: 60px;
    top: 100px;
    background: #55c9c2;
    border-radius: 51px;
}

#assgn {
    position: absolute;
    width: 230px;
    height: 52px;
    left: 30px;
    top: 25px;

    background: #C4C4C4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #000000;
}

#record {
    position: absolute;
    width: 230px;
    height: 52px;
    left: 290px;
    top: 25px;

    background: #414141;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #FFFFFF;
}

#upload {
    position: absolute;
    width: 230px;
    height: 52px;
    right: 30px;
    top: 25px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #000000;
}

#headings {
    position: absolute;
    top: 100px;
    left: 45px;
    font-size: 20px;
}

#subject {
    position: absolute;
    left: 170px;
}

#tut {
    position: absolute;
    left: 370px;
}

#title {
    position: absolute;
    left:800px;
}

#linebreak {
    width: 1750%;
}

#assignmentList {
    position: absolute;
    top: 120px;
    font-size: 20px;
}

#assgnlist {
    position: absolute;
    max-height: 450px;
    overflow-y:scroll;
    left:20px;
}

#listElement {
    background: #ffffff;
    margin: 10px;
    padding: 5px;
    border-radius: 20px;
    width: 1350px;
}

#dateList {
    position: absolute;
    left: 10px;
}

#tutorList{
    position: absolute;
    left: 400px;
}

#subjectList {
    position: absolute;
    left: 170px;
}

#titleList {
    position: absolute;
    left: 800px;
}

#downloadBtn {
    position: absolute;
    right:60px;
}

#trashBtn {
    position: absolute;
    right:20px;
}

</style>
