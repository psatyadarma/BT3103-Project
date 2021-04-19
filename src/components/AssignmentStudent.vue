<template>
    <div id='full'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <button id='assgn'>Assignment</button>
        <button id='upload' @click="$router.push('/uploadStudent')">Upload File</button>
        
        <div id='headings'>
            <label id='dueDate'>Due Date</label>
            <label id='subject'>Subject</label>
            <label id='assignment'>Assignment</label>
            <hr id='linebreak'>
        </div>

        <div id='assignmentList'>
            <ul>
                <li v-for="assgn in allAssignments" :key="generateKey(assgn.dueDate, assgn.id)">
                    <span id='dateList'>{{assgn.dueDate}} </span>
                    <span id='subjectList'>{{assgn.subject}} </span>
                    <span id='headerList'>{{assgn.header}} </span>
                    <span id='descList'>{{assgn.description}} </span>
                    <button id='downloadBtn' @click.prevent="download(assgn.uploadURL, assgn.header)"><i class="fa fa-download"></i></button>
                    <button id='trashBtn' @click.prevent="deleteFile(assgn.id,assgn.uploadURL)"><i class="fa fa-trash"></i></button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'AssignmentStudent',
  data() {
      return {
          thisUserId: "z0CCpM0ydJPwz8Q4H6We2fYem7t1", //firebase.auth().currentUser.uid,
          allAssignments: [],
          sorted:[], 
      };
  },
  
  methods: {
      fetchAssignments: function() {
          db.collection('student_files').where("student", "==", this.thisUserId).get().then((querySnapShot)=> {
            let assignment = {}
            querySnapShot.forEach((doc) => {
                  assignment = doc.data()
                  assignment.id = doc.id
                  assignment.dateObject = new Date(assignment.dueDate)
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
          this.removeFileFromFirestore(id)
          this.removeFileFromFirebase(link)
          location.reload()
          this.fetchAssignments()
      },

      removeFileFromFirestore: function(id) {
        db.collection('student_files').doc(id).delete().then(() => {
            console.log('Document deleted successfully from firestore')
        })
      },

      removeFileFromFirebase: function(link) {
        const storageRef = firebase.storage().ref();
        storageRef.child(link).delete().then(() => 
        console.log('File deleted sucessfully from firebase'))
      },

      generateKey(date, id) {
      const uniqueKey = `${date}-${id}`;
      return uniqueKey;
      }

  },

  created() {
      this.fetchAssignments()
      console.log("all assignments: ", this.allAssignments)
  },

}

</script>


<style scoped>

#full {
    position: absolute;
    width: 1418px;
    height: 650px;
    left: 114px;
    top: 100px;
    background: #C1E8F0;
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

#record {
    position: absolute;
    width: 230px;
    height: 52px;
    left: 290px;
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

#headings {
    position: absolute;
    top: 100px;
    left: 45px;
    font-size: 20px;
}

#subject {
    position: absolute;
    left: 150px;
}

#assignment {
    position: absolute;
    left: 750px;
}

#checkboxFilter {
    position: absolute;
    left: 1300px;
}

#linebreak {
    width: 1750%;
}

input[type=checkbox] {
    transform: scale(1.6);
    vertical-align: middle;
}

#assignmentList {
    position: absolute;
    top: 120px;
    font-size: 20px;
}

ul {
    overflow-y:scroll;
}

ul li {
    background: #ffffff;
    margin: 10px;
    padding: 5px;
    border-radius: 20px;
    width: 1320px;
}

</style>
