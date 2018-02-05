<template>
  <form @submit.prevent="handleSubmit">
    <input type="submit" value="Logout">
  </form>
</template>

<script>
export default {
  name: 'logout',
  methods: {
    handleSubmit() {
      this.$emit('logout');
    },
  },
};
</script>
