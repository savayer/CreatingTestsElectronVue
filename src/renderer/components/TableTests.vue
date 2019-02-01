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
            <button class="actions btn btn-secondary" :data-id="test.id">Edit</button>
            <button class="actions btn btn-danger" :data-id="test.id">Delete</button>
            <button class="actions btn btn-primary" :data-id="test.id">Export</button>
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