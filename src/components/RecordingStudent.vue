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

    <div id='full'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <button id='assgn' @click="$router.push('/assignmentStudent')">Assignment</button>
        <button id='record'>Recording</button>
        <button id='upload' @click="$router.push('/uploadStudent')">Upload File</button>
        
        <div style="height: 300px; overflow: auto;">
            <table id='assignmentTable' class="table mt-5">
                <thead>
                    <th scope='col'>#</th>
                    <th scope='col'>Upload Date</th>
                    <th scope='col'>Subject</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Download</th>
                    <th scope='col'>Delete</th>
                </thead>

                <tbody>
                    <tr v-for="(assgn,i) in sortedAssignments" :key='i'>
                        <td scope='row'>{{++i}}</td>
                        <td scope='row'>{{assgn.uploadDate}}</td>
                        <td scope='row'>{{assgn.subject}}</td>
                        <td scope='row'>{{assgn.title}}</td>
                        <td scope='row'>
                            <button id='downloadBtn' @click.prevent="download(assgn.uploadURL, assgn.title)"><i class="fa fa-download"></i></button>
                        </td>
                        <td scope='row'>
                            <button id='trashBtn' @click.prevent="deleteFile(assgn.id,assgn.uploadURL)"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                  this.allAssignments.push(assignment)

                  
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

table {
    position: absolute;
    width: 100%;
    top: 90px;
    font-size: 20px;
    table-layout: fixed;
    display: block;
    max-height: 470px;
    overflow-y: scroll;
}

th {
    border-bottom:1px dashed #333333
}

td {
  text-align: center;
  word-wrap: break-word;
}

th, td { 
    padding: 10px;
}

tr td:nth-child(1) {
    width: 30px;
}

tr td:nth-child(2) {
    width: 150px;
}

tr td:nth-child(3) {
    width: 150px;
}

tr td:nth-child(4) {
    min-width: 850px;
    max-width: 900px;
}

tr td:nth-child(5) {
    width: 30px;    
}

tr td:nth-child(6) {
    width: 30px;
}

</style>
