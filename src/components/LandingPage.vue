<template>
  <div>
      <nav>
          <ul class="navbar" style="list-style-type: none;">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/logout">Logout</router-link></li>
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
        <img src="https://amesite.com/wp-content/uploads/2021/03/undraw_Online_learning_re_qw08-1024x740.png" alt="studying logo">
      </div>
      <span class='circle'></span>
  </div>
</template>

<script>

export default {
  name: 'LandingPage',
  components: {
    
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
    top: 100px;

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
    top: 220px;

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

#button1 {
    position: absolute;
    width: 180 px;
    height: 61px;
    left: 96px;
    top: 550px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
    display: flex;
    align-items: center;
    text-align: center;

    background: #48B9B2;
    border-radius: 50px;
}

#button2 {
    position: absolute;
    width: 140px;
    height: 61px;
    left: 300px;
    top: 550px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    
    background-color: #48B9B2;
    border-radius: 30px;
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

img {
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