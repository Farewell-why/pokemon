<template>
  <div class="frist">
    <nav>
      <div class="logo">
        <img src="./assets/logo.png" alt="">
      </div>
      <router-link to="./">
        <div class="a">相关视频</div>
      </router-link>
      <router-link to="./guide">
        <div class="b">精灵图鉴</div>
      </router-link>
      <router-link to="./shopping">
        <div class="c">周边游戏</div>
      </router-link>
      <router-link to="./my">
        <div class="d">实用工具</div>
      </router-link>
      <div class="pikaqiu">
        <img src="./assets/pikaqiu.png" alt="">
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
nav {
  width: 1300px;
  height: 74px;
  margin: auto;

}

.logo {
  width: 200px;
  height: 74px;
  margin: 0 30px 0 0;
  float: left;
}

.a {
  width: 200px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  float: left;
  border-bottom: 4px solid lightblue;
  color: lightblue;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: backgroud-color 2s ease 0s, color 2s ease 0s;
}

.b {
  width: 200px;
  height: 70px;
  color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  float: left;
  border-bottom: 4px solid lightgreen;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  transition: backgroud-color 2s ease 0s, color 2s ease 0s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.c {
  width: 200px;
  height: 70px;
  color: lightpink;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  float: left;
  border-bottom: 4px solid lightpink;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  transition: backgroud-color 2s ease 0s, color 2s ease 0s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.d {
  width: 200px;
  height: 70px;
  color: lightslategray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  float: left;
  border-bottom: 4px solid lightslategray;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  transition: backgroud-color 2s ease 0s, color 2s ease 0s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.pikaqiu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 74px;
  margin: 0 0 0 30px;
  float: left;
}

.a:hover {
  background-color: lightblue;
  color: white;
}

.b:hover {
  background-color: lightgreen;
  color: white;
}

.c:hover {
  background-color: lightpink;
  color: white;
}

.d:hover {
  background-color: lightslategray;
  color: white;
}

.pikaqiu img {
  display: block;
  width: 100%;
  height: 150%;
}
</style>
