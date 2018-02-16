<template>
  <div class="container" :class="position">
    <div class="left">
      <h1>Ujjwal Sharma</h1>
      <h2><small>@ryzokuken</small></h2>
      <p>Web Developer · Security Enthusiast · FOSS Freak · Google Summer of Code 2017 <a href="#">@publiclab</a> · INTP-T · He/Him · <a href="#">#react</a> <a href="#">#vuejs</a> <a href="#">#electron</a> <a href="#">#rails</a> <a href="#">#nodejs</a></p>
      <div class="social">
        <img src="static/ic_language_black_24px.svg" alt="Website" @click="() => { handleSocial('website') }">
        <img src="static/github.svg" alt="GitHub" @click="() => { handleSocial('github') }">
        <img src="static/linkedin.svg" alt="LinkedIn" @click="() => { handleSocial('linkedin') }">
        <img src="static/twitter.svg" alt="Twitter" @click="() => { handleSocial('twitter') }">
      </div>
    </div>
    <div class="centre">
      <logout v-if="loggedIn" :username="username" @logout="handleLogout"></logout>
      <login v-else @login="handleLogin"></login>
      <img v-if="position === 'm-left'" src="static/ic_close_white_24px.svg" alt="Close" class="img-left" @click="setCentre">
      <img v-else src="static/ic_info_white_24px.svg" alt="Info" class="img-left" @click="setLeft">
    </div>
    <notifications classes="notification" />
  </div>
</template>

<script>
import Login from '@/components/Login';
import Logout from '@/components/Logout';

export default {
  name: 'harbor',
  components: {
    Login,
    Logout,
  },
  data() {
    return {
      position: 'm-centre',
    };
  },
  props: ['loggedIn', 'username'],
  methods: {
    handleLogin(data) {
      this.$emit('login', data);
    },
    handleLogout() {
      this.$emit('logout');
    },
    setLeft() {
      this.position = 'm-left';
    },
    setCentre() {
      this.position = 'm-centre';
    },
    handleSocial(social) {
      switch (social) {
        case 'github':
          return this.$emit('link', 'https://github.com/ryzokuken');
        case 'twitter':
          return this.$emit('link', 'https://twitter.com/ryzokuken');
        case 'linkedin':
          return this.$emit('link', 'https://www.linkedin.com/in/ryzokuken/');
        case 'website':
          return this.$emit('link', 'https://ryzokuken.github.io/');

        default:
          return undefined;
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  font-family: sans-serif;
  font-weight: 400;
}

.container {
  display: flex;
  transition: all 0.5s ease-in-out;
}

.container.m-centre {
  transform: translateX(-350px);
}

.container.m-left {
  transform: translateX(0);
}

.left {
  min-width: 350px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 15px;
}

.left > h1 {
  font-size: 38px;
}

.centre {
  min-width: 100vw;
}

.centre .img-left {
  position: absolute;
  left: 365px;
  bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #00b09b, #96c93d);
}

input {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  font-size: 2rem !important;
  border: 2px solid white;
  color: white;
  background: transparent;
  outline: none;
}

input[type='submit'] {
  transition: all 0.2s ease-in-out;
}

input[type='submit']:hover {
  color: #4bbd6c;
  background: white;
}

::placeholder {
  color: rgba(256, 256, 256, 0.3);
}

.notification {
  padding: 10px;
  margin: 10px 10px 0;

  font-size: 18px;
  font-family: sans-serif;
  color: white;
  background: transparent !important;
  border: 2px solid white;
  border-radius: 5px;
}

.left > p {
  margin: 30px;
}

img {
  width: 40px;
  height: 40px;
  margin: 10px;
}

img {
  transition: transform 0.2s ease-in-out;
}

img:hover {
  transform: scale(1.3);
}
</style>
