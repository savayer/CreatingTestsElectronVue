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
            <button :data-id="test.id">edit</button>
            <button :data-id="test.id">delete</button>
            <button :data-id="test.id">Export</button>
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