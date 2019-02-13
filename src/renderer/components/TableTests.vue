<template>
  <div class="table_wrapper">
    <table class="table top30 table-striped">
      <thead>
        <th>מס’</th>
        <th>תאריך</th>
        <th>פרטי שאלה</th>
        <th>פעולות</th>
      </thead>
      <tbody>
        <tr v-for="(test, index) in tests" :key="index">
          <td>
            {{ index+1 }}
          </td>
          <td>
            {{ test.date }}
          </td>
          <td>
            {{ test.name }}
          </td>
          <td class="actions-link">
            <router-link :to="`/new-test/edit/${test.id}`" class="actions btn btn-custom btn-secondary">עריכה</router-link>
            <button class="actions btn btn-danger btn-red" @click="deleteTest(test.id, test.name)">מחק</button>
            <button class="actions btn btn-primary btn-orange" @click="testExport(test)">יצוא</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'
  import fs from 'fs'
  import CryptoJS from 'crypto-js'
  const {dialog} = require('electron').remote

  export default {
    name: 'tableTests',
    props: {
      tests: {
        type: Array,
        required: true
      }
    },
    methods: {
      deleteTest (idTest, nameTest) {
        if (confirm(`delete ${nameTest}?`)) {
          let formData = new FormData()
          formData.append('id', idTest)
          axios
            .post('http://exam.smile-li.ru/delete/index.php', formData)
            .then(data => {
                if (data.data === 'ok') {
                    window.location.reload()
                }
            })
            .catch(e => { this.errors.push(e) })
        }
      },
      testExport (testObj) {
        let tmpTest = {}
        tmpTest.date = testObj.date
        tmpTest.id = testObj.id
        tmpTest.name = testObj.name
        tmpTest.encrypt = testObj.encrypt
        dialog.showSaveDialog({
          filters: [
            {
              name: 'Text',
              extensions: ['txt']
            }
          ],
          /* defaultPath: `C:\\${testObj.name}.txt`, */
          defaultPath: `./${testObj.name}.txt`
          },
          (fileName) => {
            let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(tmpTest), '?Nd2DOKHgAKK|@$')
            let content = ciphertext

            if (fileName === undefined) {
                console.log('You didn\'t save the file')
                return
            }
            fs.writeFile(fileName, content, (err) => {
                if (err) {
                    alert('An error ocurred creating the file ' + err.message)
                }

                alert('Successful saved')
            })
        })
      }
    }
  }
</script>