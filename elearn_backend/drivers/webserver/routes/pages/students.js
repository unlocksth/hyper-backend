const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');

let studentsDb = require('../../../../controllers/students-db');

router.get('/students', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    let url = {
      entry: './student',
    };
    res.render('pages/students', { title: 'Student List', url: url });
  }
);

router.get('/student/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    let url = {
      list: '/students',
      post: '/student'
    };
    if (req.params.id)
      data = await studentsDb.findStudent('id', req.params.id);
    res.render('pages/student-entry', { title: 'Student Entry', url: url, data: data });

    // this code is smarter but can't serialize data
    // try {
    //   let data = {};
    //   if (req.params.id) {
        // const result = await studentsDb.findStudent('id', req.params.id);
    //       if (result)
    //         data = result[0];
    //   }
    //   console.log("Data ", data)
    //   res.render('pages/student-entry', { title: 'Student Entry', data: data });
    // }
    // catch (error) {
    //   console.log(`Error ${error}`);
    //   next(error);
    // }
  }
)
.post('/student',
  (req, res, next) => {
    let status = "FAIL"
    req.body.prefect = true; // next dynamic ()
    if (!req.body.id)
      studentsDb.addStudent(req.body)
      .then(result => {
        if (result != null)
          status = "SUCCESS"
        res.json({ status: status, data: result });
      })
      .catch(error => {
        console.log(`Error ${error}`);
        res.json({ status: status, data: error });
      });
    // else update section coming soon
  }
);

module.exports = router;
