<template>
    <div class="wrapper">
        <div class="container">
            <router-link to="/" class="btn btn-light">
                Go back
            </router-link>
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
            
            <button @click="save()" class="btn btn-success">Save</button>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'new-test',
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
        }
    }
  }
</script>
