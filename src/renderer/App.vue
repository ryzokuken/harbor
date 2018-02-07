<template>
  <div>
    <logout v-if="loggedIn" :username="username" @logout="handleLogout"></logout>
    <login v-else @login="handleLogin"></login>
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
  props: ['loggedIn', 'username'],
  methods: {
    handleLogin(data) {
      this.$emit('login', data);
    },
    handleLogout() {
      this.$emit('logout');
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
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
  background: transparent;
  border: 2px solid white;
  border-radius: 5px;
}
</style>
