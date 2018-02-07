<template>
  <form @submit.prevent="handleSubmit">
    <h1>Logged in as {{ username }}</h1>
    <input type="submit" value="Logout">
  </form>
</template>

<script>
export default {
  name: 'logout',
  props: ['username'],
  methods: {
    handleSubmit() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
  font-family: sans-serif;
  font-weight: 400;
  margin-bottom: 20px;
  font-size: 36px;
}
</style>
