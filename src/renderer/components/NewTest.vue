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
        <div class="container">
            <router-link to="/" class="btn btn-light">
                Go back
            </router-link>
            <br>  
            <h3>
                {{ id ? `Edit ${testName}` : 'Create New Test' }}
            </h3>
            <br>
            <input type="text" v-model="testName" placeholder="Type test name" class="form-control">
            
            <div class="questions">
                <div v-for="(val, key) in questionAnswers" :class="`question${key}`" :key="key">
                    <span @click="deleteQuestion(key)" class="deleteQuestion" :title="`delete question ${key+1}`"></span>
                    <input :placeholder="`Question ${key+1}`" v-model="val.question">
                    <ul>
                        <li v-for="(answer, index) in val.answers" :key="index">
                            <input type="text" :placeholder="`Answer ${index+1}`" v-model="answer.answer">
                            <span @click="deleteAnswer(key, index)" class="deleteAnswer" :title="`delete answer ${index+1}`"></span>
                            <input type="checkbox" class="checkbox-right-answer" v-model="answer.right">
                        </li>
                    </ul>
                    <div class="add-answer" @click="addAnswer(key)">
                        <span class="plus"></span>
                        <span>Add answer</span>
                    </div>
                </div>
            </div>

            <div class="add-question" @click="addQuestion()">
                <span class="plus"></span>
                <span>Add question</span>
            </div>
            
            <div v-if="id">
                <button @click="saveEdits()" class="btn btn-success">Save edits</button>
            </div>
            <div v-else>
                <button @click="save()" class="btn btn-success">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  const remote = require('electron').remote

  export default {
    name: 'new-test',
    props: ['id'],
    data () {
      return {
        testName: '',
        questionAnswers: []
      }
    },
    methods: {
        addQuestion () {
            const newBlankQuestion = { question: '', answers: [ { answer: '', right: false } ] }
            this.questionAnswers.push(newBlankQuestion)
        },
        deleteQuestion (idQuestion) {
            if (confirm(`Delete question ${idQuestion + 1}?`)) {
                this.questionAnswers.splice(idQuestion, 1)
            }
        },
        addAnswer (idQuestion) {
            this.questionAnswers[idQuestion].answers.push({ answer: '', right: false })
        },
        deleteAnswer (idQuestion, idAnswer) {
            if (confirm(`Delete answer ${idAnswer + 1}?`)) {
                this.questionAnswers[idQuestion].answers.splice(idAnswer, 1)
            }
        },
        save () {
            if (this.testName === '') {
                alert('Type test name!')
                return
            }
            let formData = new FormData()
            formData.append('name', this.testName)
            formData.append('encrypt', JSON.stringify(this.questionAnswers))
            axios
                .post('http://exam.savayer.space/insert/index.php', formData)
                .then(data => {
                    if (data.data === 'ok') {
                        this.$router.push('/')
                    }
                })
                .catch(e => { this.errors.push(e) })
        },
        saveEdits () {
            if (this.testName === '') {
                alert('Type test name!')
                return
            }
            let formData = new FormData()
            formData.append('id', this.id)
            formData.append('name', this.testName)
            formData.append('encrypt', JSON.stringify(this.questionAnswers))
            axios
                .post('http://exam.savayer.space/update/index.php', formData)
                .then(data => {
                    if (data.data === 'ok') {
                        this.$router.push('/')
                    }
                })
                .catch(e => { this.errors.push(e) })
        },
        closeWindow () {
            let w = remote.getCurrentWindow()
            w.close()
        }
    },
    mounted () {
        if (this.id) {
            axios
                .get('http://exam.savayer.space/getById/?id=' + this.id)
                .then(response => {
                    this.testName = response.data[0].name
                    this.questionAnswers = JSON.parse(response.data[0].encrypt)
                })
        }
    }
  }
</script>
