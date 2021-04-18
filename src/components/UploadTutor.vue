<template>
    <div id='full'>
        <button id='newAssgn'>New Assignment</button>
        <button id='newRecord' @click="$router.push('/uploadTutorRecording')">New Recording</button>
        
        
        <form id='inputs'>
            <div id='dates'>
                <label id='dueDate' for="date"><strong>Due Date: </strong></label>
                <input type="date" v-model="assignment.dueDate">
            </div>


            <div id='dropdowns'>
                <label id='subjectLabel' for="subject"><strong>Subject:</strong></label>
                <select name="subject" id="subject" v-model="assignment.subject">
                    <!--loop through subject list here-->
                    <option v-for="sub in this.subjects" v-bind:key="sub.id"></option>
                        <!--{{sub}}-->
                    

                </select>

                <label id='studentLabel' for="student"><strong>Student:</strong></label>
                <select name="student" id="student" v-model="assignment.student">
                    <!--loop through student list here-->
                    <option v-for="stu in this.students" v-bind:key="stu.stuid" v-bind:value="stu.stuid"></option>
                        <!--{{stu.first_name}} {{stu.last_name}}-->

                </select>
            </div>
            
            <div id='assignBody'>
                <strong id='header'>Assignment Header:</strong> <input id='headerMsg' type='text' v-model.lazy="assignment.header"> <br>
                <strong id='desc'>Assignment Description: </strong> <textarea id='descMsg' type='text' v-model.lazy="assignment.description"></textarea> <br>
                <strong id='files'>Additional Files: </strong> <input id='fileUpload' type="file" @change="onFileChange">
            </div>

            <button id='submit' v-on:click.prevent='addItem'> Submit </button>
        </form>

    </div>
</template>

<script>

import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'UploadTutor',
  data() {
      return {
          thisUserId: firebase.auth().currentUser.uid,
          students: [],
          subjects:[],
          uploadFiles: [],
          urlLink: '',
          assignment:{
              dueDate:'',
              subject:'',
              student:'',
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
    console.log(filesB)
    this.uploadBlob(filesB)

    },

    uploadBlob: function(file) {
        const ref = firebase.storage().ref().child('assignments/forStudents/' + this.assignment.student.stuid + '/' +
                                                                                this.assignment.dueDate + '_' +
                                                                                this.assignment.subject + '_' +
                                                                                this.assignment.header + '.docx');
        ref.put(file).then((snapshot) => {
            this.urlLink = ref
            console.log('Uploaded file');
            console.log(this.urlLink.fullPath)
        });
    },
    
    
    addItem:  function () {
            //Save item to database
            this.assignment.uploadURL = this.urlLink.fullPath
            db.collection('student_files').doc().set(this.assignment);
            alert("Item saved successfully")
            this.$router.push('/tutorAssignment')
        },

    getStudents: function() {
        db.collection('profiles').doc(this.thisUserId).get().then((querySnapShot) => {
            let tutor = {}
            tutor = querySnapShot.data()
            this.students = tutor.mystudents                   
          })
    },

    getSubjects: function() {
        var thisUserId = firebase.auth().currentUser.uid
        database.collection('profiles').get().then((querySnapShot) => {
              let tutor = {}
              querySnapShot.forEach((doc) => {
                  tutor = doc.data()
                  if (tutor.id == thisUserId) {
                      this.subjects = tutor.subjects
                  }
              })
          })
    }

    },
  created() {
    this.getStudents();
    this.getSubjects();
    console.log(this.students)
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
    height: 394px;
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
    left: 255px;
    height: 20px;
    top: 15px;
    font-size: 20px;
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
    left: 150px;
    font-size: 15px;
    font-weight: 500;
}

#submit {
    position: absolute;
    width: 142px;
    height: 52px;
    left: 1250px;
    top: 585px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

}

</style>
