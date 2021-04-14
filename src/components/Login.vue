<template>
  <div style="text-align:center" class="formdiv">   
  <h1>Login</h1> 
  <form @submit.prevent="login">     
    <input       
      type="email"       
      placeholder="Email address"       
      v-model="email"     
    /><br><br>      
    <input       
      type="password"       
      placeholder="Password"       
      v-model="password"     
    /><br><br>      
    <button type="submit" value="login">
       Login
    </button>   
  </form> 
</div>
</template>


<script>
import firebase from "../firebase"
var db = firebase.firestore();

export default {
  name: 'SignInPage',
  data() {
        return {
            email: '',
            password: '',
        };
    },
  methods: {
    login() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
              alert('Successfully logged in');
              console.log(user)
              const usersRef = db.collection('profiles').doc(user.user.uid)
              usersRef.get()
              .then((docSnapshot) => {
                if (docSnapshot.exists) {
                  this.$router.push('/homeTutor');
                } else {
                  this.$router.push('/homeStudent'); 
                }
              });
          })
          .catch(error => {
              alert(error.message);
      });
    },
  },
}
</script>

<style scoped>
.formdiv {
  border-radius: 25px;
  border: 4px solid black;
  padding: 20px;
  background-image:linear-gradient(green, yellow);
  width: 400px;
  margin: auto;
}
h1 {
  font-size:24pt
}
input, select {
  height:40px;
  width:200 px;
  font-size: 14pt;
  margin:5px 0;
  padding:8px;
  border-radius:10px;
  box-shadow: 2px 1px
}

button {
  height:40px;
  width:100px;
  font-size: 14pt;
  background-color:aquamarine
}
</style>