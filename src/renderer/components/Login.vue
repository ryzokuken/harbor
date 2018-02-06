<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <input type="submit" value="Login">
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('login', { username: this.username, password: this.password });
    },
  },
};
</script>
