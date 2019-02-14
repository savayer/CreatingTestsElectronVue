<template>
  <div class="wrapper">
    <header class="header">
      <div class="item power">
        <img src="../assets/power.png" class="img" @click="closeWindow()">
      </div>
      <div class="item profile">
        <span>
          שלום שלמה הפטקר
        </span>
        <span>
          <img src="../assets/profile.png">          
        </span>
      </div>
      <div class="item logo">
        <img src="../assets/logo.png" class="logo" alt="">
      </div>
    </header>
    <div class="container top30 text-right relative">
      <router-link to="/new-test" class="btn btn-success btn-custom" style="position: relative;z-index: 1000;">
        צור שאלה
        <span class="plus"></span>
      </router-link>
      <h2 class="absolute-text-center ">
        סדר (1/6 סדרי משנה) מסכת
      </h2>
      <table-tests 
        :tests="dataTests"
      />
    </div> 

  </div>
</template>

<script>
  import tableTests from './TableTests'
  import axios from 'axios'
  const remote = require('electron').remote

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
    methods: {
      closeWindow () {
        let w = remote.getCurrentWindow()
        w.close()
      }
    },
    mounted () {
      axios
        .get('http://exam.smile-li.ru/dfg/')
        .then(response => (this.dataTests = response.data))
    }
  }
</script>

<style lang="scss" src="./../assets/scss/styles.scss"></style>