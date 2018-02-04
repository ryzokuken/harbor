<template>
  <login></login>
</template>

<script>
  import Login from '@/components/Login';

  export default {
    name: 'harbor',
    components: {
      Login,
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
    background: linear-gradient(to right, #00b09b, #96c93d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

  ::placeholder {
    color: rgba(256, 256, 256, 0.3);
  }
</style>
