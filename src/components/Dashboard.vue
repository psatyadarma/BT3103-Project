<template>
    <div>
        <h1>Welcome to your Dashboard, {{ tutor.last_name }}</h1>

        <div class='row'>
            <div class='column clickMetrics'>
                <p class='clickMetricTitle'>Total Profile Views</p>
                <div class='clickMetricsText'>{{ profileViews }}</div>
            </div>
            <div class='column clickMetrics'>
                <p class='clickMetricTitle'>Avg. Daily Profile Views</p>
                <div class='clickMetricsText'>{{ avgDailyProfileViews[0] }} - {{ avgDailyProfileViews[1] }}</div>
            </div>
            <div class='column clickMetrics'>
                <p class='clickMetricTitle'>Total Contact Clicks</p>
                <div class='clickMetricsText'>{{ contactClicks }}</div>
            </div>
            <div class='column clickMetrics'>
                <p class='clickMetricTitle'>Contact Click : Profile View</p>
                <div class='clickMetricsText'>{{ contactToProfileRatio[0] }} : {{ contactToProfileRatio[1] }}</div>
                <div id='ratioPercent'>({{ ratioPercent }}%)</div>
            </div>
        </div>

        <div id='lineChart'>
            <line-chart></line-chart>
        </div>

        <div class='row'>
            <div class='column'><radar-chart></radar-chart></div>
            <div class='column'>
                <div class='row'>
                    <div class='column avgRating'>
                        <h2>Engaging</h2>
                        <div class='avgRatingText'>{{ avgScores[0] }}</div>
                    </div>
                    <div class='column avgRating'>
                        <h2>Communication</h2>
                        <div class='avgRatingText'>{{ avgScores[1] }}</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='column avgRating'>
                        <h2>Listening</h2>
                        <div class='avgRatingText'>{{ avgScores[2] }}</div>
                    </div>
                    <div class='column avgRating'>
                        <h2>Patience</h2>
                        <div class='avgRatingText'>{{ avgScores[3] }}</div>
                    </div>
                </div>
            </div>
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
            avgDailyProfileViews: [],
            contactToProfileRatio: []
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
                this.avgDailyProfileViews = [Math.floor(tutor.profileViews / dayDiff), Math.ceil(tutor.profileViews / dayDiff)];
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

h1 {
    text-align: center;
    font-size: 64px;
}

.row {
  display: flex;
}

.column {
  flex: 50%;
}

.avgRating {
    height: 300px;
    width: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 20px 20px 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}

.avgRating:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

.avgRatingText {
    font-size: 8rem;
    margin-top: 30px;
    font-family: Montserrat;
}

.clickMetrics {
    height: 240px;
    width: 300px;
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

.clickMetricsText {
    font-size: 3rem;
    margin-top: 50px;
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

.clickMetricTitle {
    color: grey;
    font-weight: 900;
    font-family: Montserrat;
    font-size: 1.5rem;
}

#lineChart {
    margin: 50px 0;
}


</style>