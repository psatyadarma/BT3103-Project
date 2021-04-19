<template>
    <body>
        <img :src="logo" />
    <nav>
        <ul class="navbar" style="list-style-type: none;">
            <li><router-link to="/HomeTutor">Home</router-link></li>
            <li><router-link to="/ProfileTutor">Profile</router-link></li>
            <li><router-link to="/CalendarTutor">Calendar</router-link></li>
            <li><router-link to="/assignmentTutor">Assignment</router-link></li>
        </ul>
    </nav>

    <div id='full'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <button id='assgn'>To Grade</button>
        <button id='upload' @click="$router.push('/uploadTutor')">Upload File</button>
        
        <div id='headings'>
            <label id='student'>Student</label>
            <label id='header'>Header</label>
            <label id='desc'>Description</label>
            <hr id='linebreak'>
        </div>

        <div id='assignmentList'>
            <ul id='assgnlist'>
                <li id='listElement' v-for="assgn in sortedAssignments" :key="generateKey(assgn.uploadDate, assgn.id)">
                    <span id='dateList'>{{assgn.uploadDate}} </span>
                    <span id='headerList'>{{assgn.header}} </span>
                    <span id='descList'>{{assgn.description}} </span>
                    <button id='downloadBtn' @click.prevent="download(assgn.uploadURL, assgn.header)"><i class="fa fa-download"></i></button>
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
  name: 'AssignmentTutor',
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
          db.collection('tutor_files').where("tutorId", "==", this.thisUserId).get().then((querySnapShot)=> {
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
          db.collection('tutor_files').doc(id).delete().then(() => {
            firebase.storage().ref().child(link).delete().then(() => {
                alert('File deleted successfully')

                location.reload()
                this.fetchAssignments()
            })
          })   
      },

      generateKey(date, id) {
      const uniqueKey = `${date}-${id}`;
      return uniqueKey;
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

#header {
    position: absolute;
    left: 450px;
}

#desc {
    position: absolute;
    left: 800px;
}

#linebreak {
    width: 2200%;
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

#subjectList {
    position: absolute;
    left: 170px;
}

#headerList {
    position: absolute;
    left: 460px;
}

#descList {
    position: absolute;
    left: 830px;
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
