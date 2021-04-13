
<template>

        <div class="table-container">
 
 <div class="table-head-container flex-no-space">
    <div class="table-head">Name</div>
    <div class="table-head">Importance</div>
    <div class="table-head">Last Try</div>
    <div class="table-head">Tries</div>
    <div class="table-head">Status</div>
    <div class="table-head">Actions</div>
 
    </div>
 
 
<table>
    <tr v-for="(task,idx) in tasks" :key="idx" > 
        <task-preview :task="task" />
</tr>
  </table>
  </div>
  
</template>



<script>

import taskPreview from './task-preview.vue'

export default {
props: {
  tasks: {
    type: Array
  }
},
  
  medivods: {
 
  },
  computed: {
   
  },
  components: {

    taskPreview
  },

}
</script>