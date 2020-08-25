let Student = require('../../../database/mongodb/models/student');
let serialize = require('./serializer'); // serializer custom to db

let listStudents = () => {
  return Student.find({})
    .then(serialize);
}

let findStudent = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return Student.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let findStudentsBy = (prop, val) => {
  return Student.find({[prop]: val})
    .then(serialize);
}

let addStudent = (studentInfo) => {
  console.log("studentInfo ", studentInfo);
  // let student = makeStudent(studentInfo)
  // let newStudent = {
  //   name: student.getName(),
  //   grade: student.getGrade(),
  //   age: student.getAge(),
  //   prefect: student.isPrefect()
  // }
  return Student.create(studentInfo)
    .then(serialize);
}

let deleteStudent = (id) => {
  return Student.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'success'
      }
    })
    .catch(err => {
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  return Student.remove();
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
};

