<template>
    <div class="wrapper">
        <header class="header">
            <div class="item power" @click="closeWindow()">
                <img src="../assets/power.png" class="img" >
            </div>
            <div class="item profile">
                <span>
                שלום שלמה הפטקר
                </span>
                <span>
                <img src="../assets/profile.png">          
                </span>
            </div>
            <!-- <div class="item menu">
                <ul>
                <li class="active">
                    <router-link to="/">
                    עריכה
                    </router-link>
                </li>
                <li>
                    <router-link to="/history">
                    היסטוריית מבחנים
                    </router-link>
                </li>
                </ul>
            </div>    -->
            <div class="item logo">
                <router-link to="/">
                    <img src="../assets/logo.png" class="logo" alt="">
                </router-link>
            </div>
        </header>
        <div class="container top30">            
            <h3 class="text-center">
                {{ id ? testName : 'סדר (1/6 סדרי משנה) מסכת' }}
            </h3>
            <br>
            <input type="text" v-model="testName" placeholder="Test name" class="form-control">
            <hr>
            <div class="text-right">
                <button class="btn btn-success btn-custom" @click="addQuestion()">
                    צור שאלה
                    <span class="plus"></span>
                </button>
            </div>
            <div class="questions">
                <div v-for="(val, key) in questionAnswers" class="question" :class="`order${questionAnswers.length - key}`" :key="key">
                    <div class="form-group">
                        <span @click="deleteQuestion(key)" class="deleteQuestion" :title="`delete question ${key+1}`"></span>
                        <label :for="`question${key}`" class="float-right">
                            <b>שאלה {{ key+1 }}:</b>
                        </label>
                        <input :id="`question${key}`" :placeholder="`שאלה ${key+1}`" class="myform-control" v-model="val.question">
                    </div>
                    <div class="form-group row">
                        <div class="col-6">
                            <input type="text" class="form-control form-control-sm" placeholder="מקור" v-model="val.source">
                        </div>
                    </div>
                    <label class="answer-title">
                        <div class="add-answer" @click="addAnswer(key)">
                            <span class="plus"></span>
                            <!-- <span>Add answer</span> -->
                        </div>
                        <b>תשובה:</b>
                    </label>
                    <ul>
                        <li v-for="(answer, index) in val.answers" :key="index">                            
                            <div class="block-answer">                                
                                <input type="text" class="myform-control2" :placeholder="`תשובה ${index+1}`" v-model="answer.answer">
                                <span @click="deleteAnswer(key, index)" class="deleteAnswer" :title="`delete answer ${index+1}`"></span>
                                <input type="checkbox" class="checkbox-right-answer" v-model="answer.right">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>            
            
            <div v-if="id" class="text-right">
                <button @click="saveEdits()" class="btn btn-primary btn-save">
                    שמור עריכות
                    <span class="arrow"></span>
                </button>
            </div>
            <div v-else class="text-right">
                <button @click="save()" class="btn btn-primary btn-save">
                    שמור
                    <span class="arrow"></span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import CryptoJS from 'crypto-js'
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
            const newBlankQuestion = { question: '', answers: [ { answer: '', right: false } ], source: '' }
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
            let date = new Date()
            let decryptedData = {
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                name: this.testName,
                encrypt: this.questionAnswers
            }
            decryptedData.encrypt = JSON.stringify(decryptedData.encrypt)
            let encrypt = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), '?Nd2DOKHgAKK|@$')
            formData.append('name', this.testName)
            formData.append('encrypt', encrypt)
            axios
                .post('http://exam.smile-li.ru/dfg/insert/index.php', formData)
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
            let date = new Date()
            let decryptedData = {
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                name: this.testName,
                encrypt: this.questionAnswers
            }
            decryptedData.encrypt = JSON.stringify(decryptedData.encrypt)
            let encrypt = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), '?Nd2DOKHgAKK|@$')
            formData.append('id', this.id)
            formData.append('name', this.testName)
            formData.append('encrypt', encrypt)
            axios
                .post('http://exam.smile-li.ru/dfg/update/index.php', formData)
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
                .get('http://exam.smile-li.ru/dfg/getById/?id=' + this.id)
                .then(response => {
                    this.testName = response.data[0].name
                    let bytes = CryptoJS.AES.decrypt(response.data[0].encrypt.toString(), '?Nd2DOKHgAKK|@$')
                    let decryptData = bytes.toString(CryptoJS.enc.Utf8)
                    let decryptedObj = JSON.parse(decryptData)
                    this.questionAnswers = JSON.parse(decryptedObj.encrypt)
                })
        }
    }
  }
</script>