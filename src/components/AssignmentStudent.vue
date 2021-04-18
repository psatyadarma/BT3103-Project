<template>
    <div id='full'>
        <button id='assgn'>Assignment</button>
        
        <div id='headings'>
            <label id='dueDate'>Due Date</label>
            <label id='subject'>Subject</label>
            <label id='assignment'>Assignment</label>
            <input type='checkbox' id='checkboxFilter' v-model='completed'>
            <hr id='linebreak'>
        </div>

        <div id='assignmentList'>
            <ul>
                <li v-for="assgn in allAssignments" :key="assgn.dueDate">
                    {{assgn.dueDate}} {{assgn.subject}} {{assgn.header}}
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
          allAssignments: [],
      };
  },
  methods: {
      fetchAssignments: function() {
          db.collection('student_files').where("studentId", "==", firebase.auth().currentUser.uid).get().then((querySnapShot)=> {
            let assignment = {}
            querySnapShot.forEach((doc) => {
                  assignment = doc.data()
                  this.allAssignments.push(assignment)
            })
          })
      },

      download: function(link) {
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
                  link.download = this.header;
                  link.click();
                  URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
            })
      },
  },

  created() {
      this.fetchAssignments()
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

#checkboxFilter {
    transform: scale(2);
}



</style>
