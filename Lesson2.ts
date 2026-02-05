enum GroupStatus {
  Recruiting = 'recruiting',
  Active = 'active',
  Completed = 'completed'
}

type Grade = {
  workName: string;
  mark: number;
}

type Visit = {
  lesson: string;
  visit: boolean;
}

class Student {
  private _firstName: string; 
  private _lastName: string;
  private _birthYear: number;
  private _grades: Grade[] = [];
  private _visits: Visit[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }
  
  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
    this._grades.push({ workName: workName, mark: mark});
  }

  setVisit(lesson: string, visit: boolean): void {
    this._visits.push({ lesson: lesson, visit: visit});
  }

  getPerformanceRating(): number {
    if (!this._grades.length) return 0;

    const averageGrade = this._grades.reduce((sum, grade) => sum + grade.mark, 0) / this._grades.length;
    const visitCount = this._visits.filter(item => item.visit === true).length;
    const totalVisits = this._visits.length;
    const attendancePercentage = (visitCount / totalVisits) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

class Group {
  private _area: string;
  private _status: GroupStatus;
  private _students: Student[] = [];

  constructor(area: string, status: GroupStatus) {
    this._area = area;
    this._status = status;
  }

  get area(): string {
    return this._area;
  }

  get status(): GroupStatus {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  set status(status: GroupStatus) {
    this._status = status;  
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(stud => stud !== student);
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

class Level {
  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: Group) {
    this._groups.push(group);
  }

  removeGroup(group: Group) {
    this._groups = this._groups.filter(gr => gr !== group);
  }
}

class Area {
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter(lvl => lvl !== level);
  }
}

class Lecturer {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string;

  constructor(name: string, surname: string, position: string, company: string, experience: number, courses: string[], contacts: string) {
    this.name = name;
    this.surname = surname;
    this.position = position;
    this.company = company;
    this.experience = experience;
    this.courses = courses;
    this.contacts = contacts;
  }
}

class School {
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter(area => area.name !== areaName);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(name: string, surname: string): void {
    this._lecturers = this._lecturers.filter(lecturer => !(lecturer.name === name && lecturer.surname === surname));
  }
}

const sharaga = new School();
console.log(sharaga);

const prepod1 = new Lecturer(
  "Oleg", 
  "Dushnila", 
  "Pidor", 
  "Huinya", 
  15, 
  ["Hui", "LOL"], 
  "oleg@zaebal.com"
);

const prepod2 = new Lecturer(
  "Vitalya", 
  "Pizdabol", 
  "Lox", 
  "Valve incorporated", 
  2, 
  ["Dota 2"], 
  "vitalya@naebal.com"
);

sharaga.addLecturer(prepod1);
sharaga.addLecturer(prepod2);

console.log(prepod1);
console.log(prepod2);

const sukaaa = new Area("Igrok v dotu");
sharaga.addArea(sukaaa);

const hardLevel = new Level("1400gpm", "Bf + pt 7 minuta");
sukaaa.addLevel(hardLevel);
console.log(sukaaa);

const groupTupoy = new Group("Huesosi", GroupStatus.Active);
hardLevel.addGroup(groupTupoy);

console.log(hardLevel)

const student1 = new Student("Loh", "Pedalniy", 2005);
const student2 = new Student("Goy", "Progressivniy", 2004);
const student3 = new Student("Mashina", "Ubiysa", 2000); 

groupTupoy.addStudent(student1);
groupTupoy.addStudent(student2);
groupTupoy.addStudent(student3);

console.log(student1);
console.log(student2);
console.log(student3);

student1.setVisit("Para 1", false);
student1.setVisit("Para 2", false);
student1.setGrade("Domashka", 2);


student2.setVisit("Para 1", true);
student2.setVisit("Para 2", true);
student2.setGrade("Domashka", 3);

student3.setVisit("Para 1", true);
student3.setVisit("Para 2", true);
student3.setGrade("Domashka", 10);

console.log("Spisok pidorasikov:");
const topSpisok = groupTupoy.showPerformance();

topSpisok.forEach((stud, index) => {
  console.log(`${index + 1}. ${stud.fullName}: ${stud.getPerformanceRating()}`);
});


