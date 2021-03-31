<template>
    <div>
        <h1 id='heading'>Browse Through Our Tutors!</h1>
        <input type="search" id='searchBar' v-model='searchQuery' spellcheck=true 
            placeholder='Keywords such as Subject, Level...'>
        <button id='searchButton'></button>
        <button id='myTutors'></button>
        <select name="sortBy" id="sortBy">
            <option value="rating">Rating</option>
            <option value="rates">Rates</option>
        </select>
        <select name="filterBy" id="filterBy">
            <option value="subject">Subject</option>
            <option value="experience">Years of Experience</option>
        </select>
        <ul>
            <li v-for='tutor in tutors' :key='tutor.id'>
                <img v-bind:src='tutor.image' alt='Tutor Image'>
                <p id='tutorName'>{{ tutor.name }}</p>
                <p id='tutorSubject'>{{ tutor.subject }}</p>
                <p id='tutorDescription'>{{ tutor.description }}</p>
                <p id='tutorYearsExp'>Years of Experience: {{ tutor.experience }}</p>
                <p id='tutorRates'>{{ tutor.rates }}</p>
                <!--Find a way to display ratings as stars-->
            </li>
        </ul>
        <ul>
    </div>
</template>

<script>

import database from "../firebase.js"

export default {
  name: 'BrowseTutors',
  data() {
      return {
          tutors: [],
          searchQuery: '',
      };
  },
  methods: {

      fetchTutors: function() {
          database.collection('tutors').get().then((querySnapShot) => {
              let tutor = {}
              querySnapShot.forEach((doc) => {
                  tutor = doc.data()
                  tutor.show = false
                  tutor.id = doc.id
                  this.tutors.push(tutor)
              })
          })
      },

  },

  created() {
      this.fetchTutors()
  },

}
</script>

<style scoped>

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
  margin: 10px;
}

button {
    position: absolute;
    width: 130px;
    height: 61px;
    left: 96px;
    top: 650px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 100px;
    display: flex;
    align-items: center;
    text-align: center;

    background: #48B9B2;
    border-radius: 50px;
}

</style>