/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { ipcRenderer as ipc } from 'electron';
import Vue from 'vue';

import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
const vm = new Vue({
  components: { App },
  template:
    '<App :loggedIn="loggedIn" :username="username" @login="handleLogin" @logout="handleLogout" />',
  data: {
    loggedIn: false,
    username: undefined,
  },
  methods: {
    handleLogin(data) {
      ipc.send('login', data);
    },
    handleLogout() {
      this.loggedIn = false;
    },
  },
}).$mount('#app');

ipc.on('logged-in', (event, username) => {
  vm.loggedIn = true;
  vm.username = username;
});
