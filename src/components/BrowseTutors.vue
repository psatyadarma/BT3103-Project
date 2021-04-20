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
        <h1 id='heading'>Browse Through Our Tutors!</h1>
        <div>
            <button type="button" class='liButton' id='myTutors' v-on:click='myTutors()'>My Tutors</button>
        </div>
        
        <div id='searching'>
            <input type="search" v-model='searchQuery' spellcheck=true 
            placeholder='Keywords such as Subject, Level, Rates...'>
        </div>
        
        <div id='dropdowns'>
            
            <label for="sortBy"><strong>Sort By:</strong></label>
            <select name="sortBy" id="sortBy" v-model='sortingKey' v-on:change='sortTutors()'>
                <option value="select">Select...</option>
                <option value="ratesAsc">Rates (Low to High)</option>
                <option value="ratesDesc">Rates (High to Low)</option>
                <option value="rate">Rating</option>
                <option value="experience">Years of Experience</option>
            </select>

            <label for="level"><strong>Level:</strong></label>
            <select name="level" id="level" v-model='levelKey'>
                <option value="select">Select...</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="JC">JC</option>
                <option value="University">University</option>
            </select>

            <label for="subject"><strong>Subject:</strong></label>
            <select name="subject" id="subject" v-model='subjectKey'>
                <option value="select">Select...</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
            </select>
        
        </div>
        
        <div id='tutorCarousel'>
            <ul id='tutorList'>
                <li id='tutorCard' v-for='tutor in filteredTutors' :key='tutor.id' v-on:mouseover='incrementProfileView(tutor.id)'>
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
                                               {{ tutor.level[3] }}
                    </p>
                    <p id='tutorYearsExp'>Years of Experience: {{ tutor.experience }}</p>
                    <p id='tutorRates'>Rates: ${{ tutor.rates }}/hr</p>
                    <p v-if='tutor.rate == 1'>Rating: ⭐</p>
                    <p v-else-if='tutor.rate == 2'>Rating: ⭐⭐</p>
                    <p v-else-if='tutor.rate == 3'>Rating: ⭐⭐⭐</p>
                    <p v-else-if='tutor.rate == 4'>Rating: ⭐⭐⭐⭐</p>
                    <p v-else-if='tutor.rate == 5'>Rating: ⭐⭐⭐⭐⭐</p>
                    <button class='liButton' v-on:click="$router.push({name: 'requestForm', params: { tutid: tutor.id }})">Request a Timeslot</button><br><br>
                    <button type='button' id='contactInfo' class='liButton' v-on:click='openContactModal(tutor.id, tutor.last_name, tutor.email, tutor.phone)'>Contact</button><br><br>
                    <button type='button' id='addTutor' class='liButton' v-on:click='openAddTutorModal(tutor.id, tutor.last_name)'>Add to MyTutors</button>
                </li>
            </ul>
        </div>

        <div class='modal' id='contactModal'>
            <div class='modal-header'>
                <div class='title' id='contactModalTitle'>Get in Touch with Pietro Pang</div>
                <button class='close-button' v-on:click='closeContactModal()'>&times;</button>
            </div>
            <div class='modal-body'>
                <p id='contactModalEmail'></p>
                <p id='contactModalPhone'></p>
            </div>
        </div>
        <div id='contactOverlay' v-on:click='closeContactModal()'></div>

        <div class='modal' id='addTutorModal'>
            <div class='modal-header'>
                <div class='title' id='addTutorModalTitle'>Confirm that you are adding Pietro Pang</div>
                <button class='close-button' v-on:click='closeAddTutorModal()'>&times;</button>
            </div>
            <div class='modal-body'>
                <button type='button' id='addTutorConfirm' class='liButton' v-on:click='updateMyTutors(addTutorId)'>Yes</button>
            </div>
        </div>
        <div id='addTutorOverlay' v-on:click='closeAddTutorModal()'></div>

    </div>
</template>

<script>

import logo from "../assets/logo2.png"
import profile from "../assets/profile.jpg"
import firebase from "../firebase.js"
var database = firebase.firestore();

export default {
  name: 'BrowseTutors',
  data() {
      return {
          tutors: [],
          mytutors: [],
          searchQuery: '',
          sortingKey: '',
          levelKey: 'select',
          subjectKey: 'select',
          addTutorId: '',
          logo: logo,
          profile: profile
      };
  },
  methods: {

      fetchTutors: function() {
          database.collection('profiles').get().then((querySnapShot) => {
              let tutor = {}
              querySnapShot.forEach((doc) => {
                  tutor = doc.data()
                  tutor.show = false
                  tutor.id = doc.id
                  this.tutors.push(tutor)
              })
          })
      },

      sortTutors: function() {
          var key = this.sortingKey;
          if (key == 'select') {
              this.tutors = this.tutors.sort((a,b) => (a.id > b.id) ? 1 : -1);
          } else if (key == 'ratesAsc') {
              this.tutors = this.tutors.sort((a,b) => (a.rates > b.rates) ? 1 : -1);
          } else if (key == 'ratesDesc') {
              this.tutors = this.tutors.sort((a,b) => (a.rates > b.rates) ? 1 : -1);
              this.tutors = this.tutors.reverse();
          } else {
              this.tutors = this.tutors.sort((a,b) => (a[key] > b[key]) ? 1 : -1);
              this.tutors = this.tutors.reverse();
          }
      },

      incrementProfileView: function(id) {
          database.collection('profiles').doc(id).get().then((querySnapShot) => {
              var tutor = querySnapShot.data();
              var dateToday = new Date().toDateString().slice(4);
              var oldViewHistory = tutor.viewHistory;
              if (dateToday in oldViewHistory) {
                  oldViewHistory[dateToday] = oldViewHistory[dateToday] + 1;
              } else {
                  oldViewHistory[dateToday] = 1;
              }
              var dateKeys = Object.keys(oldViewHistory);
              dateKeys = dateKeys.sort((a,b) => new Date(a) - new Date(b));
              if (dateKeys.length > 30) {
                  var firstDayInList = dateKeys[0];
                  delete oldViewHistory[firstDayInList];
              }
              var newViewHistory = oldViewHistory;
              database.collection('profiles').doc(id).update({
                  profileViews: tutor.profileViews + 1,
                  viewHistory: newViewHistory
              })
          })
      },

      openContactModal: function(id, name, email, phone) {
          const modal = document.getElementById('contactModal');
          if (modal == null) return
          document.getElementById('contactModalTitle').innerHTML = "Get in touch with " + name;
          document.getElementById('contactModalEmail').innerHTML = "Email: " + email;
          document.getElementById('contactModalPhone').innerHTML = "Phone: " + phone;
          modal.classList.add('active');
          document.getElementById('contactOverlay').classList.add('active');
          //Increment contactClicks by 1
          database.collection('profiles').doc(id).get().then((querySnapShot) => {
              var tutor = querySnapShot.data();
              var dateToday = new Date().toDateString().slice(4);
              var oldClickHistory = tutor.clickHistory;
              if (dateToday in oldClickHistory) {
                  oldClickHistory[dateToday] = oldClickHistory[dateToday] + 1;
              } else {
                  oldClickHistory[dateToday] = 1;
              }
              var dateKeys = Object.keys(oldClickHistory);
              dateKeys = dateKeys.sort((a,b) => new Date(a) - new Date(b));
              if (dateKeys.length > 30) {
                  var firstDayInList = dateKeys[0];
                  delete oldClickHistory[firstDayInList];
              }
              var newClickHistory = oldClickHistory;
              database.collection('profiles').doc(id).update({
                  contactClicks: tutor.contactClicks + 1,
                  clickHistory: newClickHistory
              })
          })
      },

      closeContactModal: function() {
          const modal = document.getElementById('contactModal');
          if (modal == null) return
          modal.classList.remove('active');
          document.getElementById('contactOverlay').classList.remove('active');
      },

      openAddTutorModal: function(id, name) {
          const modal = document.getElementById('addTutorModal');
          if (modal == null) return
          document.getElementById('addTutorModalTitle').innerHTML = "Confirm that you are adding " + name;
          this.addTutorId = id;
          modal.classList.add('active');
          document.getElementById('addTutorOverlay').classList.add('active');
      },

      updateMyTutors: function(id) {
          if (!(this.mytutors.includes(id))) {
              this.mytutors.push(id);
          }
          var studentId = firebase.auth().currentUser.uid;
          //Add tutor to student's mytutors array
          database.collection('students').doc(studentId).get().then((querySnapShot) => {
              querySnapShot.ref.update({
                  mytutors: this.mytutors
              })
          });
          //Add student to tutor's mystudents array
          database.collection('profiles').doc(id).get().then((querySnapShot) => {
              var studentList = querySnapShot.data().mystudents;
              if (!(studentList.includes(studentId))) {
                  studentList.push(studentId)
              }
              database.collection('profiles').doc(id).update({
                  mystudents: studentList
              })
          });
          this.addTutorId = '';
      },

      closeAddTutorModal: function() {
          const modal = document.getElementById('addTutorModal');
          if (modal == null) return
          modal.classList.remove('active');
          document.getElementById('addTutorOverlay').classList.remove('active');
      },

      myTutors: function() {
          this.$router.push('myTutors');
      },

  },

  computed: {
      filteredTutors: function() {
          if (this.levelKey == 'select' && this.subjectKey == 'select' && this.searchQuery == '') {
              return this.tutors;
          }
          var tutors = this.tutors;
          var searchResult = [];
          var filterResult = [];
          tutors.forEach(tutor => {
              var searchKeys = ['first_name', 'last_name', 'availability', 'experience', 'level', 'subject', 'rates', 'qualifications'];
              searchKeys.forEach(searchKey => {
                  if ( String(tutor[searchKey]).toLowerCase().includes(this.searchQuery.toLowerCase()) && (this.searchQuery != '')) {
                      if (!(searchResult.includes(tutor))) {
                          searchResult.push(tutor);
                      }
                  }
              })
              if (this.levelKey != 'select' && this.subjectKey != 'select') {
                  var levelMatch = false;
                  var subjectMatch = false;
                  for (let i=0; i < 5; i++) {
                      if (this.levelKey == tutor.level[i]) {
                          levelMatch = true;
                      }
                  }
                  for (let i=0; i < 5; i++) {
                      if (this.subjectKey == tutor.subject[i]) {
                          subjectMatch = true;
                      }
                  }
                  if (levelMatch && subjectMatch) {
                      filterResult.push(tutor);
                  }
              } else {
                  for (let i=0; i < 5; i++) {
                      if (this.levelKey == tutor.level[i] || this.subjectKey == tutor.subject[i]) {
                          filterResult.push(tutor);
                      }
                  }
              }
          })
          var finalResult = [];
          if (searchResult.length == 0) {
              finalResult = filterResult;
          } else if (filterResult.length == 0) {
              finalResult = searchResult;
          } else {
              searchResult.forEach(tutor => {
                  if (filterResult.includes(tutor)) {
                      finalResult.push(tutor);
                  }
              })
          }
          return finalResult;
      }
  },

  created() {
      this.fetchTutors();
      database.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot) => {
          var data = querySnapShot.data();
          this.mytutors = data.mytutors;
      })
  },

}

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

#searching {
    padding: 30px 0px;
}

#dropdowns {
    text-align: right;
    margin-right: 70px;
    position: relative;
}

#myTutors {
    margin: 10px 20px 10px 40px;
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
}

.liButton:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

input {
    border: 2px solid black;
    display: block;
    margin: 0 auto;
    width: 33%;
    padding: 13px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
}

#searchButton {
    display: block;
    margin: 20px 33% 0 auto;
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

#contactOverlay {
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

#contactOverlay.active {
    pointer-events: all;
    opacity: 1;
}

#addTutorOverlay {
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

#addTutorOverlay.active {
    pointer-events: all;
    opacity: 1;
}

</style>
