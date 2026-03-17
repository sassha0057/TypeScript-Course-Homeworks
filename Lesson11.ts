class TodoList{
    public tasks: Task[] = [];
    public search: Searching;
    public sort: Sorting;

    constructor() {
        this.search = new Searching(this);
        this.sort = new Sorting(this);
    }

    public addTask(name: string, content: string, type: 'Default' | 'Confirmable'): void {
        const newTask = new Task(name, content, type);
        this.tasks.push(newTask);
    }

    public removeTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    public editTask(taskId: number, updates: Partial<Task>, isConfirmed: boolean = false): boolean {
        const task = this.tasks.find(task => task.id === taskId);

        if(!task) {
            console.log(`Task with id "${taskId}" isn't found`);
            return false;
        }

        if(task.type === 'Confirmable' && !isConfirmed) {
            console.log(`Task "${taskId}" is needs additional verification`);
            return false;
        }

        Object.assign(task, updates);
        
        task.updatedAt = new Date();
        
        return true;
    }

    public taskInfo(taskId: number): Task | undefined {
        return this.tasks.find(task => task.id === taskId);
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
    private static nextId: number = 1;

    public id: number;
    public name: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public status: 'In Progress' | 'Completed';
    public type: 'Default' | 'Confirmable';
    
    constructor(name: string, content: string = '', type: 'Default' | 'Confirmable' = 'Default') {
        this.id = Task.nextId++;
        this.name = name;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = 'In Progress';
        this.type = type;
    }
}

class Searching {
    private todoList: TodoList;

    constructor(todoList: TodoList) {
        this.todoList = todoList;
    }

    public searchByName(taskName: string): Task | undefined  {
        return this.todoList.tasks.find(task => task.name === taskName);
    }

    public searchByContent(taskContent: string): Task | undefined  {
        return this.todoList.tasks.find(task => task.content === taskContent);
    }
}

class Sorting {
    private todoList: TodoList;

    constructor(todoList: TodoList) {
        this.todoList = todoList;
    }

    public sortByStatus(): Task[] {
        const toSortArr = [...this.todoList.tasks];
        return toSortArr.sort((a, b) => a.status.localeCompare(b.status));
    }

    public sortByCreationDate(): Task[] {
        const toSortArr = [...this.todoList.tasks];
        return toSortArr.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}