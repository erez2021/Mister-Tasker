const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getTask, getTasks, deleteTask, updateTask, addTask, performTask} = require('./task.controller')

const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', addTask)
router.put('/:id',  updateTask)
router.delete('/:id',  deleteTask)
router.get('/:id/start', performTask)

// requireAuth, requireAdmin,
// router.put('/:id',  requireAuth, updateTask)

module.exports = router