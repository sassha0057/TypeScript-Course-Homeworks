type ValidStatus = 'In Progress' | 'Completed';
type ValidType = 'Default' | 'Confirmable';
type StatusOfTasks = {
    total: number,
    completed: number,
    uncompleted: number
}


interface ITodoList {
    addTask(name: string, content: string, type: ValidType): void;
    removeTask(taskId: number): void;
    editTask(taskId: number, updates: Partial<Task>, isConfirmed: boolean): boolean;
    taskInfo(taskId: number): Task | undefined;
    allTasksList(): Task[];
    statusOfTasks(): StatusOfTasks;
}

interface ITask {
    id: number;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    status: ValidStatus;
    type: ValidType;
}

interface ISearching {
    searchByName(searchQuery: string): Task[];
    searchByContent(searchQuery: string): Task[];
}

interface ISorting {
    sortByStatus(): Task[];
    sortByCreationDate(): Task[];
}


class TodoList implements ITodoList {
    private tasks: Task[] = [];
    public search: Searching;
    public sort: Sorting;

    constructor() {
        this.search = new Searching(this);
        this.sort = new Sorting(this);
    }

    public addTask(name: string, content: string, type: ValidType): void {
        if (!name.trim()) {
            throw new Error('Name cannot be empty');
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
            throw new Error(`Task with id "${taskId}" isn't found`);
        }

        if(task.type === 'Confirmable' && !isConfirmed) {
            throw new Error(`Task with id "${taskId}" is needs additional verification`);
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

    private allTasksCount(): number {
        return this.tasks.length;
    }

    private completedTasksCount(): number {
        return this.tasks.filter(task => task.status === 'Completed').length;
    }

    private notCompletedTasksCount(): number {
        return this.allTasksCount() - this.completedTasksCount();
    }

    public statusOfTasks(): StatusOfTasks {
        return {
            total: this.allTasksCount(),
            completed: this.completedTasksCount(),
            uncompleted: this.notCompletedTasksCount()
        }
    }
}

class Task implements ITask {
    private static nextId: number = 1;

    public id: number;
    public name: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public status: ValidStatus;
    public type: ValidType;
    
    constructor(name: string, content: string = '', type: ValidType = 'Default') {
        this.id = Task.nextId++;
        this.name = name;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = 'In Progress';
        this.type = type;
    }
}

class Searching implements ISearching {
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

class Sorting implements ISorting {
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