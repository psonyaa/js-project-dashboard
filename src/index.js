import {Sprint} from "./sprint";

const sprint = new Sprint()

const userForm = document.getElementById('add-users-form')

userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName = document.getElementById('form-user').value
    sprint.addUser(userName)
})

const taskForm = document.getElementById('add-tasks-form')

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = document.getElementById('form-task').value
    sprint.addTask(taskName)
})

const deleteTaskForm = document.getElementById('delete-task-form')

deleteTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = document.getElementById('delete-tasks-list').value
    sprint.deleteTask(taskName)
})

const assignForm = document.getElementById('assign-task-form')

assignForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = document.getElementById('tasks-list').value
    const userName = document.getElementById('users-list').value
    if (taskName != null && userName != null) {
        sprint.assign(taskName, userName)
    }
})

const changeStatus = document.getElementById('move-task-form')

changeStatus.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = document.getElementById('move-tasks-list').value
    const status = document.getElementById('status-list').value
    sprint.changeStatus(taskName, status)
})


