class Person {
  constructor(name = "Anonymous", age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `hi, i am ${this.name} and my age is ${this.age}.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getGreeting() {
    let description = super.getGreeting();
    if (this.hasMajor()) {
      description += ` their major is ${this.major}`;
    }
    return description;
  }
}
class Traveler extends Person {
  constructor(name, age, location) {
    super(name, age);
    this.location = location;
  }
  hasLocation() {
    return !!this.location;
  }
  getGreeting() {
    let description = super.getGreeting();
    if (this.hasLocation()) {
      description += ` my location is ${this.location}`;
    }
    return description;
  }
}
// const me = new Student("Almog Ram", 5, "Education");
// const me2 = new Student(undefined, 6);
// console.log(me, me2);
// console.log(me.getGreeting(), me2.getGreeting());
// console.log(me.hasMajor(), me2.hasMajor());
const me3 = new Traveler("guy", 25, "herzeliya");
const me4 = new Traveler("almog", 25);
console.log(me3.getGreeting())
console.log(me4.getGreeting())
