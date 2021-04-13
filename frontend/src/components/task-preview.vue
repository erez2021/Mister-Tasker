
<template>
  <tr>
    <td class="td-title">
      {{ task.title }}
      <button @click="toggleDesc">+</button>
      <p class="description" v-if="isShown">{{ task.description }}</p>
    </td>

    <td>{{ task.importance }}</td>
    <td>{{ task.lastTriedAt }}</td>
    <td>{{ task.triesCount }}</td>
    <td>{{ task.doneAt }}</td>
    <button @click="startTask(task._id)">Start</button>
    <button @click="removeTask(task._id)">Remove</button>
  </tr>
</template>



<script>

export default {
  props: ["task"],
  data() {
    return {
      isShown: false,
    };
  },

  methods: {
    toggleDesc() {
      this.isShown = !this.isShown;
    },
    startTask(taskId) {
        this.$store.dispatch({ type: "startTask" , taskId })
    },
    removeTask(taskId) {
  
        this.$store.dispatch({ type: "removeTask" , taskId })
    },
  },
  computed: {},
  components: {

  },
};
</script>