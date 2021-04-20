<template>
    <body>
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
    <div id='full'>
        <button id='newAssgn'>New Assignment</button>
        <button id='newRecord' @click="$router.push('/uploadRecordingTutor')">New Recording</button>
        
        <form id='inputs'>
            <div id='dates'>
                <label id='dueDate' for="date"><strong>Due Date: </strong></label>
                <input type="date" v-model="assignment.dueDate">
            </div>


            <div id='dropdowns'>
                <label id='subjectLabel' for="subject"><strong>Subject:______________</strong></label>
                <select name="subject" id="subject" v-model="assignment.subject">
                    <!--loop through subject list here-->
                    <option v-for="sub in this.subjects" v-bind:key="sub">
                        {{sub}}
                    </option>
                        
                    

                </select>

                <label id='studentLabel' for="student"><strong>Student:______________</strong></label>
                <select name="student" id="student" v-model="assignment.student">
                    <!--loop through student list here-->
                    <option v-for="stu in this.students" v-bind:key="stu.first_name" v-bind:value="stu.stuid">
                        {{stu.first_name}} {{stu.last_name}}
                    </option>
                        

                </select>
            </div>
            
            <div id='assignBody'>
                <strong id='header'>Assignment Header:___________________________</strong> <input id='headerMsg' type='text' v-model.lazy="assignment.header"> <br>
                <strong id='desc'>Assignment Description: </strong> <textarea id='descMsg' type='text' v-model.lazy="assignment.description"></textarea> <br>
                <strong id='files'>Additional Files (.docx only): </strong> <input id='fileUpload' type="file" @change="onFileChange">
            </div>

            <button id='submit' v-on:click.prevent='addItem'> Submit </button>
        </form>

    </div>
    </body>
</template>

<script>
import logo from "../assets/logo2.png"
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'UploadTutor',
  data() {
      return {
          logo:logo,
          thisUserId: firebase.auth().currentUser.uid,
          studentIds: [],
          students: [],
          subjects:[],
          uploadFiles: [],
          urlLink: '',
          assignment:{
              dueDate:'',
              subject:'',
              student:'',
              tutor:'',
              header: '',
              description: '',
              uploadURL:''
          }
      };
  },
  methods: {
      
    onFileChange(e) {
    var files = e.target.files;
    if (!files.length)
        return false;
    var filesB = files[0]
    this.uploadBlob(filesB)

    },

    uploadBlob: function(file) {
        const ref = firebase.storage().ref().child('assignments/forStudents/' + this.assignment.student + '/' +
                                                                                this.genUniqueId() + '.docx');
        ref.put(file).then(() => {
            this.urlLink = ref
            console.log('Uploaded file');
            console.log(this.urlLink.fullPath)
        });
    },
    
    addItem:  function () {
            //Save item to database
            this.assignment.uploadURL = this.urlLink.fullPath
            if (!this.assignment.uploadURL) {
                alert('Please upload a document')
            }

            this.assignment.tutor = this.thisUserId
            db.collection('student_files').doc().set(this.assignment);
            alert("Item saved successfully")
            this.$router.push('/assignmentTutor')
        },

    getStudents: function() {
        db.collection('profiles').doc(this.thisUserId).get().then((querySnapShot) => {
            let tutor = {}
            tutor = querySnapShot.data()
            this.studentIds = tutor.mystudents         
            
            for (let i = 0; i < this.studentIds.length; i++) {
                let student = {}

                db.collection('students').doc(this.studentIds[i]).get().then((snapshot) => {
                    student = snapshot.data()
                    this.students.push(student)
                })
            }
          })
    },

    getSubjects: function() {
        db.collection('profiles').doc(this.thisUserId).get().then((querySnapShot) => {
            let tutor = {}
            tutor = querySnapShot.data()
            this.subjects = tutor.subject
          })
    },

    genUniqueId: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        });
    }

    },
  created() {
    this.getStudents();
    this.getSubjects();
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

#newAssgn {
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

#newRecord {
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

#dates {
    position: absolute;
    width: 439px;
    height: 43px;
    left: 30px;
    top: 100px;
    font-size: 20px;
}

#subjectLabel {
    position: absolute;
    width: 439px;
    height: 43px;
    left: 30px;
    top: 135px;
    font-size: 20px;
}

#subject {
    position: absolute;
    width: 152px;
    height: 23px;
    left: 110px;
    top: 135px;
    font-size: 16px;
}

#studentLabel {
    position: absolute;
    width: 439px;
    height: 43px;
    left: 310px;
    top: 135px;
    font-size: 20px;
    width: 250px
}

#student {
    position: absolute;
    width: 152px;
    height: 23px;
    left: 390px;
    top: 135px;
    font-size: 16px;
}

#assignBody {
    position: absolute;
    height: 344px;
    left: 30px;
    right: 30px;
    top: 180px;

    background: #FFFFFF;
    border-radius: 25px;
}

#header {
    position: absolute;
    left: 10px;
    top: 15px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

}

#headerMsg {
    position: absolute;
    left: 220px;
    height: 20px;
    top: 15px;
    font-size: 20px;
    width: 300px;
}

#desc {
    position: absolute;
    left: 10px;
    top: 50px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
}

#descMsg {
    position: absolute;
    left: 255px;
    height: 200px;
    width: 800px;
    top: 50px;
    font-size: 20px;
}

#files {
    position: absolute;
    bottom: 15px;
    left: 10px;
    font-size: 20px;
    font-weight: 500;
}

#fileUpload {
    position: absolute;
    bottom: 15px;
    left: 253px;
    font-size: 15px;
    font-weight: 500;
}

#submit {
    position: absolute;
    width: 142px;
    height: 52px;
    left: 1250px;
    top: 535px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

}

</style>
