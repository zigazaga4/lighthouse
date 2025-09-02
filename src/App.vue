<template>
  <div id="app" class="min-h-screen">
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue'

export default {
  name: 'App',
  components: {
    LandingPage
  }
}
</script>

<style>
/* Global app styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure proper mobile viewport handling */
@media screen and (max-width: 767px) {
  #app {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}
</style>
