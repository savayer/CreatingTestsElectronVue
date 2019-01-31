<template>
  <div class="wrapper">    
    <router-link to="/new-test" class="link_button">
      New Test
    </router-link>    
    <table-tests 
      :tests="dataTests"
    />

  </div>
</template>

<script>
  import tableTests from './TableTests'
  import axios from 'axios'

  export default {
    name: 'test',
    components: {
      tableTests
    },
    data () {
      return {
        dataTests: []
      }
    },
    mounted () {
      axios
        .get('http://exam.savayer.space/')
        .then(response => (this.dataTests = response.data))
    }
  }
</script>

<style lang="scss" src="./../assets/scss/styles.scss"></style>