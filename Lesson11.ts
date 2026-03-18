class TodoList{
    private tasks: Task[] = [];
    public search: Searching;
    public sort: Sorting;

    constructor() {
        this.search = new Searching(this);
        this.sort = new Sorting(this);
    }

    public addTask(name: string, content: string, type: 'Default' | 'Confirmable'): void {
        if (!name.trim()) {
            console.log('Name cannot be empty');
        }

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
            console.log(`Task with id "${taskId}" is needs additional verification`);
            return false;
        }

        Object.assign(task, updates);
        
        task.updatedAt = new Date();
        
        return true;
    }

    public taskInfo(taskId: number): Task | undefined {
        return this.tasks.find(task => task.id === taskId);
    }

    public allTasksList(): Task[] {
        return this.tasks;
    }

    public allTasksCount(): number {
        return this.tasks.length;
    }

    public completedTasksCount(): number {
        return this.tasks.filter(task => task.status === 'Completed').length;
    }

    public notCompletedTasksCount(): number {
        return this.allTasksCount() - this.completedTasksCount();
    }

    public statusOfTasks(): string {
        return `
            All tasks count: ${this.allTasksCount()};
            Completed tasks count: ${this.completedTasksCount()}; 
            To completed tasks count: ${this.notCompletedTasksCount()};
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

    public searchByName(searchQuery: string): Task[] {
        const query = searchQuery.toLowerCase();
        return this.todoList.allTasksList().filter(task => task.name.toLowerCase().includes(query));
    }

    public searchByContent(searchQuery: string): Task[] {
        const query = searchQuery.toLowerCase();
        return this.todoList.allTasksList().filter(task => task.content.toLowerCase().includes(query));
    }
}

class Sorting {
    private todoList: TodoList;

    constructor(todoList: TodoList) {
        this.todoList = todoList;
    }

    public sortByStatus(): Task[] {
        const toSortArr = [...this.todoList.allTasksList()];
        return toSortArr.sort((a, b) => a.status.localeCompare(b.status));
    }

    public sortByCreationDate(): Task[] {
        const toSortArr = [...this.todoList.allTasksList()];
        return toSortArr.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}