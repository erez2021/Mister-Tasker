


const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const externalService = require('./externalService')
const ObjectId = require('mongodb').ObjectId
const moment = require('moment')

module.exports = {
    query,
    getById,
    // getBytaskname,
    remove,
    update,
    add,
    performTask
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('task')
        var tasks = await collection.find(criteria).toArray()
        return tasks
    } catch (err) {
        loggerService.error('cannot find tasks', err)
        throw err
    }
}

async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        const task = await collection.findOne({ '_id': ObjectId(taskId) })
        return task
    } catch (err) {
        logger.error(`while finding task ${taskId}`, err)
        throw err
    }
}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ '_id': ObjectId(taskId) })
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
        throw err
    }
}

async function update(task) {
    try {
        // peek only updatable fields!
        console.log(task.triesCount, 'from backend service');
        const taskToSave = { ...task, lastTriedAt: moment(Date.now()).format('MM/DD/YYYY, h:mm:ss') }
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ '_id': ObjectId(task._id) }, { $set: taskToSave })
        // console.log('taskToSave', taskToSave);
        return taskToSave;
    } catch (err) {
        logger.error(`cannot update task`, err)
        throw err
    }
}

async function add(taskToAdd) {
    try {
        // peek only updatable fields!
        const { title, description, importance } = taskToAdd
        taskToAdd = {
            _id : makeId(),
            title,
            description,
            importance,
            createdAt: moment().startOf('hour').fromNow(),
            lastTriedAt: null,
            triesCount: 0,
            doneAt: null
        }
        console.log(taskToAdd);

        const collection = await dbService.getCollection('task')
        await collection.insertOne(taskToAdd)
        return taskToAdd
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}

async function performTask(task) {
    try {
        // console.log(task.triesCount);
        await externalService.execute(task)
        task.doneAt = `Done at: ${moment(Date.now()).format('MM/DD/YYYY, h:mm:ss')}`,
            console.log('task executed')
    } catch (error) {
        logger.error('cannot perform task')
        throw error;
    } finally {
        task.triesCount += 1
        update(task)
        console.log('updating task');
    }
}

async function getTaskByImportance() {
    let currTask
    try {
        const collection = await dbService.getCollection('task')
        currTask = collection.find({ doneAt: null }).sort({ triesCount: 1, importance: -1 }).limit(1)
    } catch (err) {
        logger.error('cannot get taskByImportance')
    } finally {
        // console.log(currTask);
        return currTask
    }
}

// setInterval(async () => {
//     const task = await getTaskByImportance()
//     console.log(task)
//     performTask(task)
// }, 5000);


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _savetasksToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/task.json', JSON.stringify(gtasks, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}




// function _createTesttasks() {]
//     const tasks = []
//     for (var i = 0; i < 21; i++) {
//         tasks.push(_createtask(titles[parseInt(Math.random() * titles.length)] + i, parseInt(Math.random() * 1000)));
//     }
//     tasks.forEach(task => save(task))
// }


