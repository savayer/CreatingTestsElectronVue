<template>
  <div class="table_wrapper">
    <table class="table">
      <thead>
        <th>№</th>
        <th>Date</th>
        <th>Name</th>
        <th>Actions</th>
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
          <td>
            <router-link :to="`/new-test/edit/${test.id}`" class="actions btn btn-secondary">Edit</router-link>
            <button class="actions btn btn-danger" @click="deleteTest(test.id, test.name)">Delete</button>
            <button class="actions btn btn-primary" :data-id="test.id">Export</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'

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
            .post('http://exam.savayer.space/delete/index.php', formData)
            .then(data => {
                if (data.data === 'ok') {
                    window.location.reload()
                }
            })
            .catch(e => { this.errors.push(e) })
        }
      }
    }
  }
</script>