<template>
  <div>
      <body>
        <p id="welcome">Welcome!</p>
        <p id="content1">Are you having trouble finding tutors to assist your studies?</p>
        <p id="content2"> Are you looking to tutor some students?</p>
        <button>Join Us</button>
      </body>  
  </div>
</template>

<script>

export default {
  name: 'LandingPage',
  components: {
    
  }
}
</script>

<style>
body {
    background-image: url('../assets/landingPage-bg.jpg');
    background-repeat: no-repeat;
    background-size: 2000px 1000px;
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

button {
    position: absolute;
    width: 130px;
    height: 61px;
    left: 96px;
    top: 650px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 100px;
    display: flex;
    align-items: center;
    text-align: center;

    background: #48B9B2;
    border-radius: 50px;
}
</style>