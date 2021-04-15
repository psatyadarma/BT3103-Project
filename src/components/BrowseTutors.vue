<template>
    <div>
        <h1 id='heading'>Browse Through Our Tutors!</h1>
        
        <div id='searching'>
            <input type="search" v-model='searchQuery' spellcheck=true 
            placeholder='Keywords such as Subject, Level, Rates...'>
            <button type="button" id='myTutors' v-on:click='myTutors()'>My Tutors</button>
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
            <ul>
                <li v-for='tutor in filteredTutors' :key='tutor.id' v-on:mouseover='incrementProfileView(tutor.id)'>
                    <img v-bind:src='tutor.image' alt='Tutor Image'>
                    <p id='tutorName'>{{ tutor.first_name }} {{ tutor.last_name }}</p>
                    <p id='tutorQualifications'>{{ tutor.qualifications }}</p>
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

import database from "../firebase.js"

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
          database.collection('tutors').doc(id).get().then((querySnapShot) => {
              var tutor = querySnapShot.data();
              database.collection('tutors').doc(id).update({
                  profileViews: tutor.profileViews + 1
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
              database.collection('profiles').doc(id).update({
                  contactClicks: tutor.contactClicks + 1
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
          database.collection('students').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
              querySnapShot.ref.update({
                  mytutors: this.mytutors
              })
          })
          this.addTutorId = '';
      },

      closeAddTutorModal: function() {
          const modal = document.getElementById('addTutorModal');
          if (modal == null) return
          modal.classList.remove('active');
          document.getElementById('addTutorOverlay').classList.remove('active');
      },

      myTutors: function() {
          this.$router.push('mytutors');
      },

  },

  computed: {
      filteredTutors: function() {
          if (this.levelKey == 'select' && this.subjectKey == 'select' && this.searchQuery == '') {
              return this.tutors;
          }
          var tutors = this.tutors;
          var searchResult = {};
          var filterResult = {};
          Object.keys(tutors).forEach(key => {
              var tutor = tutors[key];
              for (var field in tutor) {
                  if ( String(tutor[field]).toLowerCase().includes(this.searchQuery.toLowerCase()) ) {
                      searchResult[key] = tutor;
                  }
              }
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
                      filterResult[key] = tutor;
                  }
              } else {
                  for (let i=0; i < 5; i++) {
                      if (this.levelKey == tutor.level[i] || this.subjectKey == tutor.subject[i]) {
                          filterResult[key] = tutor;
                        }
                    }
              }
          })
          var finalResult = {};
          for (var key in searchResult) {
              if (key in filterResult) {
                  finalResult[key] = searchResult[key];
              }
          }
          return finalResult;
      }
  },

  created() {
      this.fetchTutors();
      database.collection('students').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
          var data = querySnapShot.data();
          this.mytutors = data.mytutors;
      })
  },

}

</script>

<style scoped>

h1 {
    text-align: center;
    font-size: 64px;
}

img {
    height: 135px;
    width: 135px;
    border-radius: 50%;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

li {
    flex-grow: 1;
    flex-basis: 25%;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 40px 40px 20px;
    box-sizing: border-box;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
    border-radius: 46px;
    cursor: pointer;
    max-width: 25%;
}

li:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 12px 12px rgba(0, 0, 0, 0.472);
}

#tutorName {
    font-family: Montserrat;
    font-weight: bold;
    color: black;
    font-size: 28px;
}

#tutorQualifications {
    font-family: Montserrat;
    color: grey;
    font-size: 20px;
}

#searching {
    padding: 30px 0px;
}

#dropdowns {
    position: absolute;
    right: 70px;
    padding: 20px;
}

#myTutors {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    background: #50cdc5;
    border-radius: 20px;
    padding: 7px 35px;
    position: absolute;
    right: 70px;
    top: 400px;
    background: #3a938d;
}

.liButton {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    background: #50cdc5;
    border-radius: 20px;
    padding: 7px 35px;
    background: #3a938d;
}

input {
    display: block;
    margin: 0 auto;
    width: 33%;
    padding: 13px;
    border-radius: 5px;
}

#searchButton {
    display: block;
    margin: 20px 33% 0 auto;
}

#tutorCarousel {
    margin-top: 150px;
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
