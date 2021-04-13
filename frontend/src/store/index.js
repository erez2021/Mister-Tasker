import Vue from 'vue'
import Vuex from 'vuex'
import { taskService } from '../services/task.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
  },

  mutations: {
    setTasks(state, payload) {
      state.tasks = payload.tasks
    },
    removeTask(state, {taskId}) {
      const idx = state.tasks.findIndex(task => task._id === taskId)
      state.tasks.splice(idx ,1)

    },
    addTask(state , {task}) {
      state.tasks.push(task)
    },
    setTaskTriesCount(state, {taskId}) {
      const task = state.tasks.find(task => task._id === taskId)
      console.log(task, 'from  store');
      task.triesCount++
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks
    }
  },

  actions: {
    async loadTasks({commit}) {
      const tasks = await taskService.getTasks()
      commit({type: 'setTasks', tasks})
    },
    startTask({commit}, {taskId}) {
      taskService.startTask(taskId)
      commit({type: 'setTaskTriesCount', taskId})
    },
    removeTask({commit}, {taskId}) {
      console.log(taskId)
      taskService.remove(taskId)
      commit({type: 'removeTask', taskId})
    },
    addTask({commit} , {task}) {
      console.log(task);
      taskService.add(task)
      commit({type: 'addTask',})

    }
  },

  modules: {
  }

})
