<template>
    <body>
        <nav>
          <ul style="list-style-type: none;">
          <li><router-link to="/HomeStudent">Home</router-link></li>
          <li><router-link to="/ProfileStudent">Profile</router-link></li>
          <li><router-link to="/CalendarStudent">Calendar</router-link></li>
          </ul>
        </nav>
  <h2>Edit Profile</h2><br>
  <div class = "editProfile">
    <form @submit.prevent="register">
      <p class="inline">  {{"First Name: "}} </p>
      <input type="text" placeholder="First Name" maxlength="50" v-model="first_name"/><br><br>
      <p class="inline">  {{"Last Name: "}} </p>
      <input type="text" placeholder="Last Name" maxlength="50" v-model="last_name"/><br><br>
      <p class="inline">  {{"Phone: "}} </p>
      <input type="text" placeholder="Phone" maxlength="50" v-model="phone"/><br><br>
      <p class="inline">  {{"Education Level: "}} </p>
      <select v-model="education">
        <option disabled value="">Education Level</option>
        <option>Primary</option>
        <option>Secondary</option>
        <option>Junior College</option>
        <option>University</option>
      </select><br><br>
      <!-- <p class="inline">  {{"Profile Picture: "}} </p>
      <button raised class="primary" @click="onPickFile">Upload Image</button>
      <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
      <img :src="imageUrl" height="150">
      <br> -->
      <button v-on:click="update()">Save Changes</button>

            </form>
        </div>
    </body>
</template>

<script>
import firebase from "../firebase"
var db = firebase.firestore();
export default {
  name: "profile",
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
        first_name:null,
        last_name: null,
        phone: null,
        education: null,
        img: null,
        uploadValue: 0,
        imageData: null,
        image: null,
        imageUrl: ''
    }
  },
  methods:{
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert("Please add a valid file!")
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    update() {
      db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
          { querySnapShot.ref.update({
          first_name : this.first_name,
          last_name : this.last_name,
          phone : this.phone,
          education: this.education,
          img: this.img,
      })})
          this.$router.push('/HomeStudent');
    },
    uploadImage: function(event) {
      const file = event.target.files[0]        
        firebase
        .app()
        .storage()
        .ref('images')
        .child(file.name)
        .put(file);
    }
    },
  created(){
      db.collection('students').doc(firebase.auth().currentUser.uid).get().then((querySnapShot)=>
        {
            var data = querySnapShot.data();
            this.first_name = data.first_name;
            this.last_name = data.last_name; 
            this.phone = data.phone;
            this.education = data.education;
        })
  } 
};
</script>

<style scoped lang="scss">
img {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
}

  div {
    background-color: #55C9C2;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 400px;
    width: 1000px;
    margin: 120px;
    padding-top: 50px;
    padding-left: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
    line-height: 150%;
  }

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

button {
  width: 150px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
  border-color: white;
}

.inline {
  display: inline;
}

.editProfile {
    font-size: 20px;
}

input {
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-spacing: 50px;
    padding: 5px;
    height: 25px;
}

.pic {
  float: right;
  margin-right: 100px;
  margin-top: 10px;
  height: 150px;
  width: 200px;
}
</style>