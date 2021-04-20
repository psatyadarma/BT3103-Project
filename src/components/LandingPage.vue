<template>
  <div>
      <img id='logo' :src="logo" />
      <nav>
          <ul class="navbar" style="list-style-type: none;">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/login">Login</router-link></li>
          </ul>
      </nav>
      <div class="content" :style="{'background-image': 'url(' + require('../assets/landingPage-bg.jpg') + ')'}">
        <p id="welcome">Welcome!</p>
        <p id="content1">Are you having trouble finding tutors to assist your studies?</p>
        <p id="content2"> Are you looking to tutor some students?</p>
        <button @click="$router.push('/registerStudent')" id="button1">Join As Student</button>
        <button @click="$router.push('/registerTutor')" id="button2">Join As Tutor</button> 
      </div>
      <div>
        <img id='icon' src="https://amesite.com/wp-content/uploads/2021/03/undraw_Online_learning_re_qw08-1024x740.png" alt="studying logo">
      </div>
      <span class='circle'></span>
  </div>
</template>

<script>

import logo from "../assets/logo2.png"

export default {
  name: 'LandingPage',
  data() {
      return {
          logo: logo
      }
  }
}
</script>

<style scoped>
.content {
    /*
    background-image: url('../assets/landingPage-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;*/
    background-color: red;
}

#welcome {
    position: absolute;
    width: 505px;
    height: 10px;
    left: 96px;
    top: 250px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 96px;
    line-height: 117px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #414141;
}

#content1 {
    position: absolute;
    width: 736px;
    height: 176px;
    left: 107px;
    top: 320px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    display: flex;
    align-items: center;

    color: #414141;
}

#content2 {
    position: absolute;
    width: 736px;
    height: 176px;
    left: 107px;
    top: 420px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    display: flex;
    align-items: center;

    color: #414141;
}

button {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    color: white;
    border-radius: 20px;
    padding: 7px 35px;
    background: #3a938d;
    cursor: pointer;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

button:hover {
    transform: scale(1.01,1.01);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.472);
}

#button1 {
    position: absolute;
    width: 200px;
    height: 61px;
    left: 96px;
    top: 580px;
}

#button2 {
    position: absolute;
    width: 200px;
    height: 61px;
    left: 300px;
    top: 580px;
    margin-left: 30px;
}

button:focus { 
  outline: none; 
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

#logo {
  float: left;
  padding-left:20px;
  padding-top: 15px;
  height: 100px;
  width: 95px;
  top:50px;
}

#icon {
  position: absolute;
  width: 340px;
  height: 246px;
  left: 971px;
  top: 238px;
}

.circle {
  position: absolute;
  width: 340px;
  height: 246px;
  left: 941px;
  top: 180px;
  height: 400px;
  width: 400px;
  background-color: #115256;
  border-radius: 50%;
  display: inline-block;
  z-index: -1;
}

</style>