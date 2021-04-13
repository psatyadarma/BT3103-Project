<template>
    <div>
        <h1 id='heading'>My Tutors</h1>

        <div id='tutorCarousel'>
            <ul>
                <li v-for='tutor in filteredTutors' :key='tutor.id'>
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
                    <button type='button' id='rateTutor' class='liButton' v-on:click='openRateTutorModal()'>Rate Tutor</button>
                    <button type='button' id='removeTutor' class='liButton' v-on:click='openRemoveTutorModal(tutor.id, tutor.last_name)'>Remove from MyTutors</button>
                </li>
            </ul>
        </div>

        <button type='button' id='backButton' class='liButton' v-on:click='navigateBack()'>Back</button>

        <div class='modal' id='rateTutorModal'>
            <div class='modal-header'>
                <div class='title' id='rateTutorModalTitle'>Rate your Tutor!</div>
                <button class='close-button' v-on:click='closeRateTutorModal()'>&times;</button>
            </div>
            <div class='modal-body'>
                
            </div>
        </div>
        <div id='rateTutorOverlay' v-on:click='closeRateTutorModal()'></div>

        <div class='modal' id='removeTutorModal'>
            <div class='modal-header'>
                <div class='title' id='removeTutorModalTitle'>Confirm that you are removing Pietro Pang</div>
                <button class='close-button' v-on:click='closeRemoveTutorModal()'>&times;</button>
            </div>
            <div class='modal-body'>
                <button type='button' id='removeTutorConfirm' class='liButton' v-on:click='updateMyTutors(removeTutorId)'>Yes</button>
            </div>
        </div>
        <div id='removeTutorOverlay' v-on:click='closeRemoveTutorModal()'></div>



    </div>
</template>

<script>

import database from "../firebase.js"

export default {

    name: 'MyTutors',
    data() {
        return {
            mytutors: [],
            filteredTutors: [],
            removeTutorId: '',
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
       
        openRemoveTutorModal: function(id, name) {
            const modal = document.getElementById('removeTutorModal');
            if (modal == null) return
            document.getElementById('removeTutorModalTitle').innerHTML = "Confirm that you are removing " + name;
            this.removeTutorId = id;
            modal.classList.add('active');
            document.getElementById('removeTutorOverlay').classList.add('active');
        },

        updateMyTutors: function(id) {
            function getIdMatch(tutorid) {
                return tutorid != id;
            }
            this.mytutors = this.mytutors.filter(getIdMatch);
            database.collection('students').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
                querySnapShot.ref.update({
                    mytutors: this.mytutors
                })
            })
            this.removeTutorId = '';
        },

        closeRemoveTutorModal: function() {
            const modal = document.getElementById('removeTutorModal');
            if (modal == null) return
            modal.classList.remove('active');
            document.getElementById('removeTutorOverlay').classList.remove('active');
        },

        navigateBack: function() {
            this.$router.push('tutors');
        },

    },

    created() {
        database.collection('students').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
          var data = querySnapShot.data();
          this.mytutors = data.mytutors;
        })
        this.fetchMyTutors();
    },

};

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

#tutorCarousel {
    margin-top: 50px;
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

.liButton {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    background: #50cdc5;
    border-radius: 20px;
    padding: 7px 35px;
    background: #3a938d;
    margin-top: 30px;
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