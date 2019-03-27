<template>
  <div id="app">
    <header-app/>
    
  </div>
</template>

<script>
  import Header from './components/header.vue'

  export default {
    name: 'app',
    components: {
      'header-app': Header
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Architects Daughter');

  #app{
    font-family: 'Architects Daughter';
  }

</style>
