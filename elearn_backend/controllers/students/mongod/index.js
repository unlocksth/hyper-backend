let Student = require('../../../database/mongodb/models/student');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Student.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Student.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });

  // this code is smarter but can't wait to serialize data
  // return Student.find({[prop]: val}, (err, resp) => {
  //   if(err) throw err;
  //   console.log("Find ", resp);
  //   return serialize(resp[0]);
  // });
}

let findDataBy = (prop, val) => {
  if (prop === 'id')
    prop = '_id';
  return Student.find({[prop]: val})
    .then(serialize);
}

let addData = (dataObj) => {
  // let student = makeStudent(dataObj)
  // let newStudent = {
  //   name: student.getName(),
  //   grade: student.getGrade(),
  //   age: student.getAge(),
  //   prefect: student.isPrefect()
  // }
  return Student.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Student.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Student.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'SUCCESS',
        message: 'Delete Successful'
      }
    })
    .catch(err => {
      return { 
        status: 'FAIL',
        message: 'Delete Unsuccessful' 
      }
    })
}

let dropAll = () => {
  return Student.remove();
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
};

