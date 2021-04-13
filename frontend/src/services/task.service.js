
import { httpService } from './http.service'
import {moment} from 'moment'


export const taskService = {
    getTasks,
    getById,
    remove,
    update,
    startTask,
    getEmptyTask,
    add
}

window.taskService = taskService

function getTasks() {
    return httpService.get(`task`)
}

function getById(taskId) {
    return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    console.log(taskId);
    return await httpService.delete(`task/${taskId}`)
}

async function update(task) {
    return await httpService.put(`task/${task._id}`, task)
}

async function add(task) {
    return await httpService.post(`task`, task)
}

function startTask(taskId) {
    return httpService.get(`task/${taskId}/start`)
}

function getEmptyTask() {
     const newTask= {
        title : '',
        description: '',
        importance: '',
         createdAt: moment(Date.now()).format('MM/DD/YYYY, h:mm:ss'),
        lastTriedAt: null,
        triesCount: 0,
        doneAt: null
    }
    return newTask
}

