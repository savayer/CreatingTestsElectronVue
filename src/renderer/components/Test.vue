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
  export default {
    name: 'test',
    components: {
      tableTests
    },
    data () {
      return {
        dataTests: [
          { num: 1, date: (new Date()).toLocaleString(), name: '1st test' },
          { num: 2, date: (new Date()).toLocaleString(), name: '2nd test' }
        ]
      }
    }
  }
</script>

<style lang="scss" src="./../assets/scss/styles.scss"></style>