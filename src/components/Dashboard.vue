<template>
    <div>
        <h1>Welcome to your Dashboard, {{ tutor.last_name }}</h1>

        <div class='row'>
            <div class='column'><radar-chart></radar-chart></div>
            <div class='column'>
                <div class='row'>
                    <div class='column avgRating'>
                        <h2>Engaging</h2>
                        <div class='avgRatingText'>9.7</div>
                    </div>
                    <div class='column avgRating'>
                        <h2>Communication</h2>
                        <div class='avgRatingText'>7.5</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='column avgRating'>
                        <h2>Listening</h2>
                        <div class='avgRatingText'>6.8</div>
                    </div>
                    <div class='column avgRating'>
                        <h2>Patience</h2>
                        <div class='avgRatingText'>8.2</div>
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

import database from '../firebase.js'
import engagingbarchart from '../engagingbarchart.js'
import communicationbarchart from '../communicationbarchart.js'
import listeningbarchart from '../listeningbarchart.js'
import patiencebarchart from '../patiencebarchart.js'
import radarchart from '../radarchart.js'

export default {
    name: 'Dashboard',
    
    data() {
        return {
            tutor: {},
        }
    },

    methods: {
        fetchTutor: function() {
            database.collection('profiles').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
                var tutor = querySnapShot.data();
                this.tutor = tutor;
            })
        },
    },

    components: {
        'engaging-bar-chart': engagingbarchart,
        'communication-bar-chart': communicationbarchart,
        'listening-bar-chart': listeningbarchart,
        'patience-bar-chart': patiencebarchart,
        'radar-chart': radarchart,
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
}

</style>