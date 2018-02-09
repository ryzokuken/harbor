<template>
  <div class="container" :class="position">
    <div class="left">
      <h1>hello world</h1>
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
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

.container {
  display: flex;
  transition: all 0.5s ease-in-out;
}

.container.m-centre {
  transform: translateX(-320px);
}

.container.m-left {
  transform: translateX(0);
}

.left {
  min-width: 320px;
  background: white;
}

.centre {
  min-width: 100vw;
}

.centre .img-left {
  position: absolute;
  left: 335px;
  bottom: 15px;
  width: 35px;
  height: 35px;
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
</style>
