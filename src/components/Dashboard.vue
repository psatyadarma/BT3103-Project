<template>
    <div>
        <img id='logo' :src="logo" />
        <nav>
            <ul class="navbar" style="list-style-type: none;">
                <li><router-link to="/HomeTutor">Home</router-link></li>
                <li><router-link to="/ProfileTutor">Profile</router-link></li>
                <li><router-link to="/CalendarTutor">Calendar</router-link></li>
                <li><router-link to="/assignmentTutor">Assignment</router-link></li>
                <li><router-link to='/logout'>Logout</router-link></li>
            </ul>
        </nav>
        <h1>Welcome to your Dashboard, {{ tutor.last_name }}</h1>

        <div>
            <button type='button' id='backButton' class='liButton' v-on:click='navigateBack()'>Back</button>
        </div>

        <div id='clickMetrics' class='row'>
            <div class='box'>
                <p class='boxTitle'>Total Profile Views</p>
                <div class='boxText'>{{ profileViews }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Avg. Daily Profile Views</p>
                <div class='boxText'>{{ avgDailyProfileViews }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Total Contact Clicks</p>
                <div class='boxText'>{{ contactClicks }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Contact Click : Profile View</p>
                <div class='boxText'>{{ contactToProfileRatio[0] }} : {{ contactToProfileRatio[1] }}</div>
                <div id='ratioPercent'>({{ ratioPercent }}%)</div>
            </div>
        </div>

        <div id='lineChart'>
            <line-chart></line-chart>
        </div>

        <div id='avgRating' class='row'>
            <div class='box'>
                <p class='boxTitle'>Engaging</p>
                <div class='boxText'>{{ avgScores[0] }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Communication</p>
                <div class='boxText'>{{ avgScores[1] }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Listening</p>
                <div class='boxText'>{{ avgScores[2] }}</div>
            </div>
            <div class='box'>
                <p class='boxTitle'>Patience</p>
                <div class='boxText'>{{ avgScores[3] }}</div>
            </div>
        </div>
        
        <div class='row'>
            <radar-chart width='872' height='872' style='display:block; box-sizing:border-box; height:700px; width:700px; margin: 10px auto;'></radar-chart>
        </div>

        <div class='row'>
            <div class='column'><engaging-bar-chart></engaging-bar-chart></div>
            <div class='column'><communication-bar-chart></communication-bar-chart></div>
        </div>
        <div class='row'>
            <div class='column'><listening-bar-chart></listening-bar-chart></div>
            <div class='column'><patience-bar-chart></patience-bar-chart></div>
        </div>

    </div>
</template>

<script>

import logo from "../assets/logo2.png"
import profile from "../assets/profile.jpg"
import engagingbarchart from '../engagingbarchart.js'
import communicationbarchart from '../communicationbarchart.js'
import listeningbarchart from '../listeningbarchart.js'
import patiencebarchart from '../patiencebarchart.js'
import radarchart from '../radarchart.js'
import linechart from '../linechart.js'
import firebase from '../firebase.js'
var database = firebase.firestore();

export default {
    name: 'Dashboard',
    
    data() {
        return {
            tutor: {},
            avgScores: [],
            profileViews: 0,
            contactClicks: 0,
            avgDailyProfileViews: 0.0,
            contactToProfileRatio: [],
            logo: logo,
            profile: profile
        }
    },

    methods: {
        fetchTutor: function() {
            database.collection('profiles').doc(firebase.auth().currentUser.uid).get().then((querySnapShot) => {
                var tutor  = querySnapShot.data();
                this.tutor = tutor;
                var engagingList = tutor.engaging;
                var communicationList = tutor.communication;
                var listeningList = tutor.listening;
                var patienceList = tutor.patience;
                var attributeLists = [engagingList, communicationList, listeningList, patienceList]
                var data = [];
                for (var i=0; i<4; i++) {
                    var attributeList = attributeLists[i];
                    var sumRatings = 0;
                    var numRatings = 0;
                    attributeList.forEach((value, index) => {
                        sumRatings += value*(index+1);
                        numRatings += value;
                    })
                    data[i] = Math.round( ((sumRatings/numRatings) + Number.EPSILON) * 10) / 10;
                }
                this.avgScores = data;
                this.profileViews = tutor.profileViews;
                this.contactClicks = tutor.contactClicks;
                this.contactToProfileRatio = this.reduce(tutor.contactClicks, tutor.profileViews);
                this.ratioPercent = (tutor.contactClicks / tutor.profileViews) * 100;
                this.ratioPercent = Math.round( ((this.ratioPercent) + Number.EPSILON) * 100) / 100;
                var today = new Date();
                var timeDiff = Math.abs(today - tutor.createDate.toDate());
                var dayDiff = Math.ceil(timeDiff / (1000*60*60*24));
                this.avgDailyProfileViews = Math.floor(tutor.profileViews / dayDiff);
            })
        },

        reduce: function(numerator, denominator) {
            var gcd = this.gcd(numerator, denominator);
            return [numerator/gcd, denominator/gcd];
        },

        //Greatest Common Divisor function using Euclidean Algorithm
        gcd: function(a,b) {
            while (b) {
                var r = a%b;
                a = b;
                b = r;
            }
            return a;
        },

        navigateBack: function() {
            this.$router.push('profileTutor');
        },

    },

    components: {
        'engaging-bar-chart': engagingbarchart,
        'communication-bar-chart': communicationbarchart,
        'listening-bar-chart': listeningbarchart,
        'patience-bar-chart': patiencebarchart,
        'radar-chart': radarchart,
        'line-chart': linechart
    },

    created() {
        this.fetchTutor();
    }
    
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

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

h1 {
    text-align: center;
    font-size: 64px;
    padding-top: 150px;
}

#backButton {
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
    margin: 10px auto;
}

.liButton:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

.row {
  display: flex;
}

.column {
  flex: 50%;
}

#avgRating {
  margin: 40px 20px 0;
}

#clickMetrics {
  margin: 40px 20px 0;
}

.box {
    height: 240px;
    flex: 20%;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 20px 20px 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}

.clickMetrics:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

.boxText {
    font-size: 5rem;
    margin-top: 40px;
    font-family: Montserrat;
}

#ratioPercent {
    font-size: 1.6rem;
    color: #7eca9c;
    font-weight: 600;
    border: 2px solid #7eca9c;
    border-radius: 10px;
    max-width: 40%;
    padding: 3px;
    margin: 0 auto 0;
    font-family: Montserrat;
}

.boxTitle {
    color: grey;
    font-weight: 900;
    font-family: Montserrat;
    font-size: 1.5rem;
}

#lineChart {
    margin: 50px 0;
}

</style>