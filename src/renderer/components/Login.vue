<template>
  <form @submit.prevent="handleSubmit" class="hello">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Pirate_ship.svg/2000px-Pirate_ship.svg.png" class="image-ship">
    <div class="box">
      <h1 style="font-family: 'Ubuntu', sans-serif; font-size: 60px;">Harbor</h1>  
      <input type="text" placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
      <input type="submit" value="Login" class="butt">
    </div> 
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
