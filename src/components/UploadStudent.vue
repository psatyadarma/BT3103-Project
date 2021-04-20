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
        <button id='newAssgn'>New Upload</button>

        <form id='inputs'>
            <div id='dropdowns'>
                <label id='tutorLabel' for="tutor"><strong>Tutor:__________________ </strong></label>
                <select name="tutor" id="tutor" v-model="assignment.tutorId">
                    <!--loop through tutor list here-->
                    <option v-for="tut in this.tutors" v-bind:key="tut.tutid" v-bind:value="tut.tutid">
                        {{tut.first_name}} {{tut.last_name}}
                    </option>

                </select>
            </div>
            
            <div id='assignBody'>
                <strong id='header'>Assignment Header:___________________________
                    </strong> <input id='headerMsg' type='text' v-model.lazy="assignment.header"> <br>
                <strong id='desc'>Assignment Description: </strong> <textarea id='descMsg' type='text' v-model.lazy="assignment.description"></textarea> <br>
                <strong id='files'>Additional Files: (in .docx) </strong> <input id='fileUpload' type="file" @change="onFileChange">
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
  name: 'UploadStudent',
  data() {
      return {
          logo: logo,
          thisUserId: firebase.auth().currentUser.uid,
          tutorIds: [],
          tutors: [],
          urlLink: '',
          assignment:{
              studentId:'',
              tutorId:'',
              header: '',
              description: '',
              uploadURL:'',
              uploadDate:''
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
        const ref = firebase.storage().ref().child('assignments/forTutors/' + this.assignment.tutorId + '/' +
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
            this.assignment.studentId = this.thisUserId
            this.assignment.uploadDate = new Date().toISOString().slice(0, 10)
            db.collection('tutor_files').doc().set(this.assignment);
            alert("Item saved successfully")
            this.$router.push('/assignmentStudent')
        },

    getTutors: function() {
        db.collection('students').doc(this.thisUserId).get().then((querySnapShot) => {
            let student = {}
            student = querySnapShot.data()
            this.tutorIds = student.mytutors
            
            for (let i = 0; i < this.tutorIds.length; i++) {
                let tutor = {}

                db.collection('profiles').doc(this.tutorIds[i]).get().then((snapshot) => {
                    tutor = snapshot.data()
                    this.tutors.push(tutor)
                })
            }
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
    this.getTutors();
    console.log('created')
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

#tutorLabel {
    position: absolute;
    width: 439px;
    height: 43px;
    left: 30px;
    top: 100px;
    font-size: 20px;
}

#tutor {
    position: absolute;
    width: 152px;
    height: 23px;
    left: 100px;
    top: 100px;
    font-size: 16px;
    outline-width: 2px;
}

#assignBody {
    position: absolute;
    height: 394px;
    left: 30px;
    right: 30px;
    top: 140px;

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
    width: 250px;
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
    left: 240px;
    font-size: 15px;
    font-weight: 500;
}

#submit {
    position: absolute;
    width: 142px;
    height: 52px;
    left: 1250px;
    top: 540px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 51px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
}


</style>
