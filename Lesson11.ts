class TodoList {
    public tasks: Task[] = [];

    public addTask(name: string, content: string): void {
        const newTask = new Task(name, content);
        this.tasks.push(newTask);
    }

    public removeTask(taskName: string): void {
        this.tasks.filter(task => task.name !== taskName);
    }

    public editTask(taskName: string, updates: Partial<Task>): boolean {
        const task = this.tasks.find(task => task.name === taskName);

        if(!task) {
            console.log(`Task "${taskName}" isn't found`)
            return false
        }

        Object.assign(task, updates);

        task.updatedAt = new Date();

        return true;
    }

    public taskInfo(taskName: string): Task | undefined {
        return this.tasks.find(task => task.name === taskName);
    }

    public allTaskList(): Task[] {
        return this.tasks;
    }

    public notCompletedTasks(): string {
        const allTasksCount = this.tasks.length;
        const completedTasksCount = this.tasks.filter(task => task.status === 'Completed').length;
        const notCompletedTasksCount = allTasksCount - completedTasksCount;
        return `
        All tasks count: ${allTasksCount};
        Completed tasks count: ${completedTasksCount}; 
        To completed tasks count: ${notCompletedTasksCount};
        `;
    }


}

class Task {
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'In Progress' | 'Completed';

    constructor(name: string, content: string = '') {
        this.name = name;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = 'In Progress';
    }
}