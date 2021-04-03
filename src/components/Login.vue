<template>
  <div style="text-align:center">   
  <h1>Login</h1> 
  <form @submit.prevent="login" style="background-color:#E6E6FA">     
        
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
          .then(() => {
              alert('Successfully logged in');
              this.$router.push('/');
          })
          .catch(error => {
              alert(error.message);
      });
    },
  },
}
</script>

<style scoped>
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