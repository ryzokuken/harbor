<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Username">
    <input type="password" placeholder="Password">
    <input type="submit" value="Login">
  </form>
</template>

<script>
export default {
  name: 'login',
  methods: {
    handleSubmit() {
      this.$emit('login');
    },
  },
};
</script>
