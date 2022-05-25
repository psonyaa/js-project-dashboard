import {Task} from './task';
import {User} from './user';

export class Sprint {

    tasks = []
    users = []


    /**
     * Отрисовать доску с задачами
     * Перед отрисовкой удалить все уже отрисованные
     */
    async renderTaskTable() {
        const newTasks = this.tasks.filter(task => task.status === 'new')
        const processingTasks = this.tasks.filter(task => task.status === 'progress')
        const doneTasks = this.tasks.filter(task => task.status === 'done')

        const todo = document.getElementById("todo");
        const process = document.getElementById("progress");
        const done = document.getElementById("done");

        this.deleteChildren(todo)
        this.deleteChildren(process)
        this.deleteChildren(done)

        this.setCards(todo, newTasks, 'todo.png')
        this.setCards(process, processingTasks, 'progress.png')
        this.setCards(done, doneTasks, 'done.png')
    }

    /**
     * Отрисовать дропдаун с пользователями
     * Перед отрисовкой удалить все уже отрисованные
     */
    async renderUsersList() {
        const users = document.getElementById("users-list");
        this.deleteChildren(users)
        Array.prototype.forEach.call(this.users, child => {
            const opt = child.name;
            const el = document.createElement("option");
            console.log(opt)
            el.textContent = opt;
            el.value = opt;
            users.appendChild(el);
        });
    }

    /**
     * Отрисовать дропдаун с задачами
     * Перед отрисовкой удалить все уже отрисованные
     */
    async renderTasksList() {
        const tasks = document.getElementById("tasks-list");
        const deleteTasks = document.getElementById("delete-tasks-list");
        const moveTasks = document.getElementById("move-tasks-list");

        this.deleteChildren(tasks)
        this.deleteChildren(deleteTasks)
        this.deleteChildren(moveTasks)

        Array.prototype.forEach.call(this.tasks, child => {
            tasks.appendChild(this.createLiEl(child));
            deleteTasks.appendChild(this.createLiEl(child));
            moveTasks.appendChild(this.createLiEl(child));
        });
    }

    /**
     * Удаление всех дочерних элементов у объекта
     *
     * @param element - элемент
     */
    deleteChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * Создание карточек задачний из списка задач
     *
     * @param element - столбец todo или progress или done
     * @param list - Списов задач
     * @param png - Аватар карточки
     */
    setCards(element, list, png) {
        Array.prototype.forEach.call(list, child => {
            const card = document.createElement("card");
            card.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)'
            card.style.width = '100px'
            const container = document.createElement("container");
            const taskName = document.createElement("h2");
            const assignee = document.createElement("p");

            taskName.innerHTML = child.name
            assignee.innerHTML = 'Assignee: ' + child.assignee
            container.appendChild(taskName)
            container.appendChild(assignee)
            card.appendChild(container)
            card.appendChild(this.todoImg(png))
            element.appendChild(card)
        });
    }

    /**
     * Создание элемента изображения
     *
     * @param png - Аватар карточки
     */
    todoImg(png) {
        const img = document.createElement('img');
        img.style.width = '50px';
        img.style.height = 'auto';
        img.src = png;
        return img;
    }

    /**
     * Создание элемента списка
     *
     * @param task - элемент задачи
     */
    createLiEl(task) {
        const opt = task.name;
        const el = document.createElement("option");
        console.log(opt)
        el.textContent = opt;
        el.value = opt;
        return el;
    }

    /**
     * Создание объекта задачи
     *
     * @param taskName - Наименование задачт
     */
    async addTask(taskName) {
        if (taskName == null) {
            throw new Error('Task is null')
        }
        const existing = this.tasks.find(t => t.name === taskName)
        if (existing != null) {
            throw new Error('Task already exists')
        }
        this.tasks.push(new Task(taskName))
        await this.renderTasksList()
        await this.renderTaskTable()
    }

    /**
     * Удаление задачи
     *
     * @param taskName - Напименование задачи
     */
    async deleteTask(taskName) {
        console.log('deletion')
        if (taskName == null) {
            throw new Error('Task is null')
        }
        const found = this.tasks.find(t => t.name === taskName)
        this.tasks = this.tasks.filter(function (item) {
            return item !== found
        })
        await this.renderTasksList()
        await this.renderTaskTable()
    }

    /**
     * Назначить исполнителя задачи
     *
     * @param  taskName - Наименование задачи
     * @param  userName - Наименование пользователя
     */
    async assign(taskName, userName) {
        const task = this.tasks.find(o => o.name === taskName)
        task.assign(userName)
        await this.renderTaskTable()
    }

    /**
     * Создание пользователя
     *
     * @param username - Наименование пользователя
     */
    async addUser(username) {
        if (username == null) {
            throw new Error('User is null')
        }
        const existing = this.users.find(u => u.name === username)
        if (existing != null) {
            throw new Error('User already exists')
        }
        this.users.push(new User(username))
        await this.renderUsersList()
        await this.renderTaskTable()
    }

    /**
     * Установка статуса задачи
     *
     * @param taskName - Наименование задачи
     * @param status - Статус
     */
    async changeStatus(taskName, status) {
        if (taskName == null) {
            throw new Error('Task is null')
        }
        if (status == null) {
            throw new Error('Status is null')
        }
        const task = this.tasks.find(t => t.name === taskName)
        task.status = status
        await this.renderUsersList()
        await this.renderTaskTable()
    }
}