export class Task {
    assignee
    status
    name

    /**
     * @param name - Наименование задачи
     */
    constructor(name) {
        this.name = name
        this.status = 'new'
        this.assignee = 'unassigned'
    }

    assign(username) {
        this.assignee = username
    }
}
