<template>
  <div class="home">
    <task-list :tasks="tasksForDisplay" />
    <div  class="add-from">
    <form @submit.prevent="addTask"  class="flex-vertical">
      <label for="title">Title</label>
        <input type="text" name="title" v-model="task.title" />
        <label for="description">Description</label>
        <textarea type="number" name="description" v-model="task.description" />
         <label for="importance">Importance</label>
        <input type="number" name="importance" list="importance" v-model="task.importance" />
        <datalist id="importance">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
        </datalist>
        <button>ADD TASK</button>
      </form>
      </div>


  </div>
</template>

<script>
// @ is an alias to /src
import taskList from '../components/task-list'

export default {
  name: 'Home',
  data() {
    return {
      task: {
      title: '',
      description: '',
      importance: ''
      }
    }
  },

  computed: {
    tasksForDisplay() {
      return this.$store.getters.getTasks
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch({ type: "addTask", task: this.task})
      console.log(this.task);
    }
  },
  components: {
    taskList,
  
  }
}
</script>
