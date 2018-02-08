/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { ipcRenderer as ipc } from 'electron';
import Vue from 'vue';

import Notifications from 'vue-notification';

import App from './App';

Vue.config.productionTip = false;
Vue.use(Notifications);

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
      ipc.send('logout', this.username);
    },
  },
}).$mount('#app');

ipc.on('logged-in', (event, username) => {
  vm.loggedIn = true;
  vm.username = username;
});

ipc.on('logged-out', () => {
  if (vm.username) {
    vm.loggedIn = false;
    vm.username = undefined;
  } else {
    throw Error('Username not properly set');
  }
});

ipc.on('login-failure', (event, err) => {
  vm.$notify(err);
});

ipc.on('logout-failure', (event, err) => {
  vm.$notify(err);
});

ipc.on('disconnected', () => {
  vm.loggedIn = false;
  vm.username = undefined;
});
