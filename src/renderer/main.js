/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { ipcRenderer as ipc } from 'electron';
import Vue from 'vue';

import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App :loggedIn="loggedIn" @login="handleLogin" @logout="handleLogout" />',
  data: {
    loggedIn: false,
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
