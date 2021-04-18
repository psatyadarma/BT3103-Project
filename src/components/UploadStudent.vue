<template>
    <div id='full'>
        <button id='newAssgn'>New Upload</button>

        <form id='inputs'>
            <div id='dropdowns'>
                <label id='tutorLabel' for="tutor"><strong>Tutor: </strong></label>
                <select name="tutor" id="tutor" v-model="assignment.tutorId">
                    <!--loop through tutor list here-->
                    <option v-for="tut in this.tutors" v-bind:key="tut.tutid" v-bind:value="tut.tutid"></option>
                        <!--{{tut.first_name}} {{tut.last_name}}-->

                </select>
            </div>
            
            <div id='assignBody'>
                <strong id='header'>Assignment Header:</strong> <input id='headerMsg' type='text' v-model.lazy="assignment.header"> <br>
                <strong id='desc'>Assignment Description: </strong> <textarea id='descMsg' type='text' v-model.lazy="assignment.description"></textarea> <br>
                <strong id='files'>Additional Files: (in .docx) </strong> <input id='fileUpload' type="file" @change="onFileChange">
            </div>

            <button id='submit' v-on:click.prevent='addItem'> Submit </button>
        </form>

    </div>
</template>

<script>

import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'UploadStudent',
  data() {
      return {
          thisUserId: firebase.auth().currentUser.uid,
          tutors: [],
          urlLink: '',
          assignment:{
              studentId:'',
              tutorId:'',
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
        const ref = firebase.storage().ref().child('assignments/forTutors/' + this.assignment.tutorId + '/' +
                                                                              this.assignment.studentId + '_' +
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
            this.assignment.studentId = this.thisUserId
            db.collection('tutor_files').doc().set(this.assignment);
            alert("Item saved successfully")
            this.$router.push('/studentAssignment')
        },

    getTutors: function() {
        db.collection('students').doc(this.thisUserId).get().then((querySnapShot) => {
            let student = {}
            student = querySnapShot.data()
            this.tutors = student.mytutors 
          })
    }

    },
  created() {
    this.getTutors();
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

#tutorLabel {
    position: absolute;
    width: 439px;
    height: 43px;
    left: 30px;
    top: 120px;
    font-size: 20px;
}

#tutor {
    position: absolute;
    width: 152px;
    height: 23px;
    left: 100px;
    top: 120px;
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
    left: 240px;
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
