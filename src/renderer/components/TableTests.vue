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
            {{ test.num }}
          </td>
          <td>
            {{ test.date }}
          </td>
          <td>
            {{ test.name }}
          </td>
          <td>
            <button>edit</button>
            <button>delete</button>
            <button>Export</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'tableTests',
  props: {
    tests: {
      type: Array,
      required: true
    }
  }
}
</script>