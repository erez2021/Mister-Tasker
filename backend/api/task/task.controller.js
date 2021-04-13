const express = require('express')
const taskService = require('./task.service.js')
const logger = require('../../services/logger.service')


const router = express.Router()

// List Of Tasks
async function getTasks(req, res) {
 try {
    const Tasks = await taskService.query()
    res.send(Tasks)
} catch (err) {
    logger.error('Failed to get Tasks', err)
    res.status(500).send({ err: 'Failed to get Tasks' })
}
}

// Get a single task by id
async function getTask(req, res) {
    try {
    const task = await taskService.getById(req.params.id)
    res.send(task) 
    } catch (err) {
        logger.error('Failed to get task', err)
    res.status(500).send({ err: 'Failed to get task' })
    }
        
}
// Add Task
async function addTask(req, res) { 
    try {
    const task = req.body
    const savedTask = await taskService.add(task)
    res.send(savedTask)
} catch (err) {
    logger.error('Failed to add task', err)
    res.status(500).send({ err: 'Failed to add task' })
}
}


// Update a Task
async function updateTask(req, res) { 
    try {
    const task = req.body 
    const savedTask = await taskService.update(task)
    res.send(savedTask)
        } catch (err) {
            logger.error('Failed to update task', err)
            res.status(500).send({ err: 'Failed to update task' })
        }
}

// remove task by id
async function deleteTask(req, res) { 
    try {
   await taskService.remove(req.params.id)
            res.send('Deleted...')
        } catch(err) {
            logger.error('Failed to delete task', err)
            res.status(500).send({ err: 'Failed to delete task' })
        }
}

async function performTask(req, res) {
    try {
        const task = await taskService.getById(req.params.id)
        console.log('task from controller:' ,task);
        taskService.performTask(task)
        res.send(task)
    } catch(err) {
        res.status(500).send({ err: 'Failed to perform task' })
    }
}

module.exports = {
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    addTask,
    performTask
}