<template>
  <div id="app">
    <header-app/>
    <section class="section">
      <div class="container">
        <weather-viewer :location="location" v-if="location"></weather-viewer>
        <div v-else>
          <p>Search for a location...</p>
        </div>
      </div>
    </section>    
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import weatherViewer from './components/weatherViewer.vue'

  export default {
    name: 'app',
    components: {
      'header-app': Header,
      'weather-viewer': weatherViewer
    },
    data(){
      return{
        location: 'Thessaloniki'
      }
    },
    created(){
      this.$bus.on('search-location', (location) => {
        this.location = location;
      });
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Architects Daughter');

  #app{
    font-family: 'Architects Daughter';
  }

</style>
