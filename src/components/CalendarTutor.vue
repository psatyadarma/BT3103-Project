<template>
<body>
  <img :src="logo" />
  <div>
    <div class="navbar">
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeTutor">Home</router-link></li>
          <li><router-link to="/ProfileTutor">Profile</router-link></li>
          <li><router-link to="/CalendarTutor">Calendar</router-link></li>
          </ul>
        </nav>
    </div>
  </div>
  <div class="cal">
  <h1 style="text-align:center; color:#55C9C2; font-weight: bold">PLAN YOUR SCHEDULE</h1>
  <v-app>  
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            color="primary"
            class="mr-4"
            @click="dialog = true"
          >
            New Event
          </v-btn>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <!-- Add event dialog  -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="Event Name (Required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="Details"></v-text-field>
              <v-text-field v-model="start" type="date" label="Start Date (Required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="End Date (Required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="Colour (Click to open color menu)"></v-text-field>              
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog=false">
                Create Event
              </v-btn>
            </v-form>
          </v-container>
        </v-card> 
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{selectedEvent.details}}
              </form>
              <form v-else>
                <textarea-autosize
                 v-model="selectedEvent.details" 
                 type="text" 
                 style="width: 100%"
                 :min-height="100"
                 placeholder="add note">
                </textarea-autosize>
              </form>  
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false">
                Close
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)">
                Edit
              </v-btn>   
              <v-btn
                text
                v-else 
                @click.prevent="updateEvent(selectedEvent)">
                Save
              </v-btn>                         
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
  </v-app>
  </div>
  </body>
</template>

<script>
import logo from "../assets/logo2.png"
import firebase from "../firebase"
var db = firebase.firestore();

  export default {
    name: "CalendarTutor",
    data: () => ({
      logo: logo,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      name: null,
      details: null,
      start: null,
      end: null,
      color: "#1976D2",
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,
      userid: null,
    }),
    mounted() {
      this.getEvents();
    },
    methods: {
      async getEvents() {
        await firebase.auth().onAuthStateChanged(user => {
            if (user!=null) {
               let events = [];
                let snapshot = db.collection('calendar');
                snapshot.get().then(querySnapshot => {
                  querySnapshot.forEach((doc) => {
                    let userid = doc.data().id;
                    if (userid == user.uid) {
                      let appData = doc.data();
                      appData.id = doc.id;
                      events.push(appData);
                    }
                  });
                })
                this.events = events;
            }
            else {
                //not the user 
            }})
      },
      async addEvent() {
        firebase.auth().onAuthStateChanged(async user => {
            if (user!=null) {              
              if(this.name && this.start && this.end) {
                await db.collection("calendar").add({
                  name: this.name,
                  details: this.details,
                  start: this.start,
                  end: this.end,
                  color: this.color,
                  id : user.uid,
                })
                this.getEvents();
                this.name = "";
                this.details = "";
                this.start = "";
                this.end = "";
                this.color = "#1976D2";
                this.id = "";
              } else {
                alert("name, start and end date are required");
              }
            }
        })
      },
      async updateEvent(ev) {
        firebase.auth().onAuthStateChanged(user => {
            if (user!=null) {
              db.collection("calendar").doc(this.currentlyEditing).update({
                details: ev.details
              });
            this.selectedOpen = false;
            this.currentlyEditing = null;
            }
        })
      },
      async deleteEvent(ev) {
        firebase.auth().onAuthStateChanged(user => {
          if (user!=null) {
            db.collection("calendar").doc(ev).delete();
            this.selectedOpen = false;
            this.getEvents();
            //this.$router.push('/HomeTutor');
          }
        });
        setTimeout( () => this.$router.push('/HomeTutor'), 500);
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today;
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      editEvent(ev) {
        this.currentlyEditing = ev.id;
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event;
          this.selectedElement = nativeEvent.target;
          setTimeout(() => (this.selectedOpen = true), 10)
        };

        if (this.selectedOpen) {
          this.selectedOpen = false;
          setTimeout(open, 10);
        } else {
          open();
        }

        nativeEvent.stopPropagation(); 
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d%10]
      },
    }
  }
</script>

<style scoped lang="scss">
img {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  margin-top:-20px;
  height: 100px;
  width: 95px;
}


.cal {
    margin: 20px;
    padding-top: 100px;
    padding-left: 20px;
  }
.navbar {
  list-style-type: none;
  overflow: hidden;
  color: black;
  float: right;
  display: block;
  text-align: center;
  padding: 4px 26px;
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
</style>