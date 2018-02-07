<template>
  <div>
    <logout v-if="loggedIn" @logout="handleLogout"></logout>
    <login v-else @login="handleLogin"></login>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { ipcRenderer as ipc } from 'electron';

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
      loggedIn: false,
    };
  },
  methods: {
    handleLogin(data) {
      ipc.send('login', data);
    },
    handleLogout() {
      this.loggedIn = false;
    },
  },
};
</script>

<style>
  
@import url('https://fonts.googleapis.com/css?family=Roboto|Ubuntu:700');

* {
  box-sizing: border-box;
  margin: 0;
}

.image-ship {
  position: fixed;
  bottom: 0vh;
  right: 7vw;
  height: 400px;
  width: 500px
}

.box {
  min-height: 450px;
  min-width: 360px;
  background: rgba(0,0,0,0.35);
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 7px;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #FF4E50;  /* fallback for old browsers */
  background-image: -webkit-radial-gradient(farthest-corner at 0px 0px, #F9D423 0%, #FF4E50 100%);
  background-image: radial-gradient(farthest-corner at 0px 0px, #F9D423 0%, #FF4E50 100%);
}

input {
  box-shadow: 0;
  border: none;
  border-radius: 0;
  background-color: transparent;
  border-bottom: 2px solid white;
  font-family: 'Roboto',sans-serif;
  width: 270px;
  min-height: 40px;
  margin-top: 25px;
  color: white;
  font-size: 17px;
  padding-left: 5px;
}

input:focus {
  outline: none;
  border-bottom: 2px solid #FF4E50;
  transition: border-color 0.5s cubic-bezier(0,.92,.57,1.07);
}

.butt {
  height: 35px;
  width: 280px;
  background-color: #FF4E50 ;
  border: 0;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.3);
  margin-top: 40px;
  color: white;
  font-size: 18px;
  font-weight: 400;
  border-radius: 0.15em;
}

.butt:hover {
  background-color: white;
  color: #ef5350;
  cursor: pointer;
}

::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
