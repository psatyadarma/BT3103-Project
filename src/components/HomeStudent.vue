<template>
<body>
  <nav>
  <ul style="list-style-type: none;">
  <li><router-link to="/HomeStudent">HomeStudent</router-link></li>
  <li><router-link to="/ProfileStudent">ProfileStudent</router-link></li>
  </ul>
  </nav>
  <div class = "reminders">
      <p class = "heading"> Reminders </p>
  </div>

  <div class = "classes">
    <p class = "heading"> Classes </p>
    </div>
  
  </body>
</template>

<script>
export default {
  name: "HomeTutor",
  props: {
    msg: String
  },
  components:{
  }
};
</script>

<style scoped lang="scss">
  * {
  box-sizing: border-box;
  }
  
  div {
    background-color: pink;
    color: black;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 35px; 
    height: 500px;
    width: 500px;  
    margin: 50px;
    font-family: "Lucida Console", "Courier New", monospace;
  }

  .heading {
  color: white;
  text-align:center;
  font-size:50px;
  font-weight: bold;
  font-family: Montserrat;
  text-decoration: underline;
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

</style>