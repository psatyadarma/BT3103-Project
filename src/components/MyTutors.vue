<template>
    <div>
        <img id='logo' :src="logo" />
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
        <h1 id='heading'>My Tutors</h1>

        <div>
            <button type='button' id='backButton' class='liButton' v-on:click='navigateBack()'>Back</button>
        </div>

        <div id='tutorCarousel'>
            <ul id='tutorList'>
                <li id='tutorCard' v-for='tutor in filteredTutors' :key='tutor.id'>
                    <img id='tutorimg' v-bind:src='profile' alt='Tutor Image'>
                    <p id='tutorName'>{{ tutor.first_name }} {{ tutor.last_name }}</p>
                    <p id='tutorQualifications'>{{ tutor.qualifications }}</p>
                    <hr id='line'>
                    <p id='tutorSubject'>Subjects: {{ tutor.subject[0] }} 
                                                   {{ tutor.subject[1] }} 
                                                   {{ tutor.subject[2] }}
                                                   {{ tutor.subject[3] }}
                                                   {{ tutor.subject[4] }}
                    </p>
                    <p id='tutorLevel'>Levels: {{ tutor.level[0] }} 
                                               {{ tutor.level[1] }}
                                               {{ tutor.level[2] }}
                    </p>
                    <p id='tutorYearsExp'>Years of Experience: {{ tutor.experience }}</p>
                    <p id='tutorRates'>Rates: ${{ tutor.rates }}/hr</p>
                    <p v-if='tutor.rate == 1'>Rating: ⭐</p>
                    <p v-else-if='tutor.rate == 2'>Rating: ⭐⭐</p>
                    <p v-else-if='tutor.rate == 3'>Rating: ⭐⭐⭐</p>
                    <p v-else-if='tutor.rate == 4'>Rating: ⭐⭐⭐⭐</p>
                    <p v-else-if='tutor.rate == 5'>Rating: ⭐⭐⭐⭐⭐</p>
                    <button type='button' id='rateTutor' class='liButton' v-on:click='openRateTutorModal(tutor.id, tutor.last_name)'>Rate Tutor</button>
                    <button type='button' id='removeTutor' class='liButton' v-on:click='openRemoveTutorModal(tutor.id, tutor.last_name)'>Remove from MyTutors</button>
                </li>
            </ul>
        </div>

        <div class='modal' id='rateTutorModal'>
            <div class='modal-header'>
                <div class='title' id='rateTutorModalTitle'>Review Pietro's Tutoring!</div>
                <button class='close-button' v-on:click='closeRateTutorModal()'>&times;</button>
            </div>
            <div class='modal-body'>
                
                <label for="engaging"><strong>Engaging: </strong></label>
                <select name="engaging" id="engaging" v-model="engaging" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <label for="communication"><strong>Communication: </strong></label>
                <select name="communication" id="communication" v-model="communication" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <label for="listening"><strong>Listening: </strong></label>
                <select name="listening" id="listening" v-model="listening" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select><br>

                <label for="patience"><strong>Patience: </strong></label>
                <select name="patience" id="patience" v-model="patience" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select><br>

                <label for="overall"><strong>Overall Rating: </strong></label>
                <select name="overall" id="overall" v-model="overall" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br>

                <button type='button' id='rateTutorConfirm' class='liButton' v-on:click='updateTutorRating(updateTutorRatingId)'>Confirm</button>

            </div>
        </div>
        <div id='rateTutorOverlay' v-on:click='closeRateTutorModal()'></div>

        <div class='modal' id='removeTutorModal'>
            <div class='modal-header'>
                <div class='title' id='removeTutorModalTitle'>Confirm that you are removing Pietro Pang</div>
                <button class='close-button' v-on:click='closeRemoveTutorModal()'>&times;</button>
            </div>
            <div class='modal-body' id='removeTutorModalBody'>
                <button type='button' id='removeTutorConfirm' class='liButton' v-on:click='updateMyTutors(removeTutorId)'>Yes</button>
            </div>
        </div>
        <div id='removeTutorOverlay' v-on:click='closeRemoveTutorModal()'></div>



    </div>
</template>

<script>

import logo from "../assets/logo2.png"
import profile from "../assets/profile.jpg"
import firebase from "../firebase.js"
var database = firebase.firestore();

export default {

    name: 'MyTutors',
    data() {
        return {
            mytutors: [],
            filteredTutors: [],
            removeTutorId: '',
            updateTutorRatingId: '',
            engaging: "0",
            communication: "0",
            listening: "0",
            patience: "0",
            overall: "0",
            engagingList: [],
            communicationList: [],
            listeningList: [],
            patienceList: [],
            overallList: [],
            sumOverallRatings: 0,
            numOverallRatings: 0,
            logo: logo,
            profile: profile
        }
    },

    methods: {

        fetchMyTutors: function() {
            database.collection('profiles').get().then(querySnapShot => {
                let tutor = {}
                querySnapShot.forEach(doc => {
                    tutor = doc.data()
                    tutor.show = false
                    tutor.id = doc.id
                    this.mytutors.forEach(id => {
                        if (id == tutor.id) {
                            this.filteredTutors.push(tutor);
                        }
                    })
                })
            })
        },

        openRateTutorModal: function(id, name) {
            const modal = document.getElementById('rateTutorModal');
            if (modal == null) return
            document.getElementById('rateTutorModalTitle').innerHTML = "Review " + name + "'s Tutoring!";
            this.updateTutorRatingId = id;
            modal.classList.add('active');
            document.getElementById('rateTutorOverlay').classList.add('active');
        },

        updateTutorRating: function(id) {
            database.collection('profiles').doc(id).get().then((querySnapShot) => {
                //Get Tutor's current ratings
                var tutor = querySnapShot.data();
                this.engagingList = tutor.engaging;
                this.communicationList = tutor.communication;
                this.listeningList = tutor.listening;
                this.patienceList = tutor.patience;
                this.overallList = tutor.overall;
                //Edit Tutor's ratings
                this.engagingList[parseInt(this.engaging) - 1] = this.engagingList[parseInt(this.engaging) - 1] + 1
                this.communicationList[parseInt(this.communication) - 1] = this.communicationList[parseInt(this.communication) - 1] + 1
                this.listeningList[parseInt(this.listening) - 1] = this.listeningList[parseInt(this.listening) - 1] + 1
                this.patienceList[parseInt(this.patience) - 1] = this.patienceList[parseInt(this.patience) - 1] + 1
                this.overallList[parseInt(this.overall) - 1] = this.overallList[parseInt(this.overall) - 1] + 1
                this.overallList.forEach((value, index) => {
                    this.sumOverallRatings += value*(index+1);
                    this.numOverallRatings += value;
                });
                var newRate = Math.ceil(this.sumOverallRatings/this.numOverallRatings);
                this.sumOverallRatings = 0;
                this.numOverallRatings = 0;
                //Update Tutor's Ratings in Firestore
                database.collection('profiles').doc(id).update({
                    engaging: this.engagingList,
                    communication: this.communicationList,
                    listening: this.listeningList,
                    patience: this.patienceList,
                    overall: this.overallList,
                    rate: newRate
                });
                //Reset updateTutorRatingId, engaging, communication, listening, patience, overall
                [this.updateTutorRatingId, this.engaging, this.communication, this.listening, this.patience, this.overall] = [ '', '0', '0', '0', '0', '0' ];
                //Reset engagingList, communicationList, listeningList, patienceList
                [this.engagingList, this.communicationList, this.listeningList, this.patienceList, this.overallList] = [ [],[],[],[],[] ];
            })
            this.closeRateTutorModal();
        },

        closeRateTutorModal: function() {
            const modal = document.getElementById('rateTutorModal');
            if (modal == null) return
            modal.classList.remove('active');
            document.getElementById('rateTutorOverlay').classList.remove('active');
        },
       
        openRemoveTutorModal: function(id, name) {
            const modal = document.getElementById('removeTutorModal');
            if (modal == null) return
            document.getElementById('removeTutorModalTitle').innerHTML = "Confirm that you are removing " + name;
            this.removeTutorId = id;
            modal.classList.add('active');
            document.getElementById('removeTutorOverlay').classList.add('active');
        },

        updateMyTutors: function(id) {
            var studentId = firebase.auth().currentUser.uid;
            function getIdMatch(tutorid) {
                return tutorid != id;
            }
            this.mytutors = this.mytutors.filter(getIdMatch);
            //Remove tutor from student's mytutors array
            database.collection('students').doc(studentId).get().then((querySnapShot) => {
                querySnapShot.ref.update({
                    mytutors: this.mytutors
                })
            });
            //Remove student from tutor's mystudents array
            database.collection('profiles').doc(id).get().then((querySnapShot) => {
                var studentList = querySnapShot.data().mystudents;
                function getStudentIdMatch(sId) {
                    return sId != studentId;
                }
                studentList = studentList.filter(getStudentIdMatch);
                database.collection('profiles').doc(id).update({
                    mystudents: studentList
                })
            });
            this.removeTutorId = '';
        },

        closeRemoveTutorModal: function() {
            const modal = document.getElementById('removeTutorModal');
            if (modal == null) return
            modal.classList.remove('active');
            document.getElementById('removeTutorOverlay').classList.remove('active');
        },
        
        navigateBack: function() {
            this.$router.push('browseTutor');
        },

    },

    created() {
        database.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot) => {
          var data = querySnapShot.data();
          this.mytutors = data.mytutors;
        })
        this.fetchMyTutors();
    },

};

</script>

<style scoped>

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

h1 {
    text-align: center;
    font-size: 64px;
    padding-top: 150px;
}

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

#backButton {
    margin: 10px 20px 10px 40px;
}

#tutorimg {
    height: 135px;
    width: 135px;
    border-radius: 50%;
}

#tutorCarousel {
    margin-bottom: 70px;
}

#tutorList {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0 auto;
    margin: 0 auto;
}

#tutorCard {
    flex-grow: 1;
    flex-basis: 25%;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 40px 50px 20px;
    box-sizing: border-box;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
    border-radius: 46px;
    cursor: pointer;
    max-width: 25%;
}

#tutorCard:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 12px 12px rgba(0, 0, 0, 0.472);
}

p {
    margin: 10px;
}

#tutorName {
    font-family: Montserrat;
    font-weight: 900;
    color: black;
    font-size: 28px;
}

#tutorQualifications {
    font-family: Montserrat;
    font-weight: 600;
    color: grey;
    font-size: 20px;
}

#line {
    width: 90%;
    margin: 10px auto 20px;
    text-align: center;
    border-top: 1px solid black;
}


.liButton {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    border-radius: 20px;
    padding: 7px 35px;
    background: #3a938d;
    cursor: pointer;
    box-shadow: 0 4px rgba(0, 0, 0, 0.25);
    margin: 10px auto;
}

.liButton:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

label {
    font-size: 20px;
}

select {
    font-size: 16px;
    color: rgb(70, 70, 70);
    padding: .6em 3em .5em .8em;
    max-width: 100%;
    margin: 10px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}

select:hover {
    border-color: rgb(70, 70, 70);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 200ms ease-in-out;
    border: 2px solid black;
    border-radius: 20px;
    z-index: 10;
    background-color: white;
    height: 200px;
    width: 500px;
    max-width: 50%;
}

#rateTutorModal {
    height: 500px;
}

.modal.active {
    transform: translate(-50%, -50%) scale(1);
}

.modal-header {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}

.modal-header .title {
    font-size: 28px;
    font-weight: 900;
    font-family: Montserrat;
}

.modal-header .close-button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: 24px;
    font-weight: 900;
}

.modal-body {
    padding: 30px 100px 10px;
}

#rateTutorOverlay {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    transition: 200ms ease-in-out;
}

#rateTutorOverlay.active {
    pointer-events: all;
    opacity: 1;
}

#removeTutorOverlay {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    transition: 200ms ease-in-out;
}

#removeTutorOverlay.active {
    pointer-events: all;
    opacity: 1;
}

</style>