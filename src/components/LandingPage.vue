<template>
  <div>
      <div class="content" :style="{'background-image': 'url(' + require('../assets/landingPage-bg.jpg') + ')'}">
        <p id="welcome">Welcome!</p>
        <p id="content1">Are you having trouble finding tutors to assist your studies?</p>
        <p id="content2"> Are you looking to tutor some students?</p>
        <button @click="$router.push('/registerStudent')" id="button1">Join As Student</button>
        <button @click="$router.push('/registerTutor')" id="button2">Join As Tutor</button> 
      </div>
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
    top: 200px;

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

#button1 {
    position: absolute;
    width: 180 px;
    height: 61px;
    left: 96px;
    top: 650px;

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
    top: 650px;

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
</style>