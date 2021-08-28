const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
let productCategoriesDb = require('../../../../controllers/product_category');

router.get('/product_categories', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/product_category-list', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.productCategorySubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/product_category/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    if (req.params.id)
      data = await productCategoriesDb.findData('id', req.params.id);
    
    res.render('pages/product_category-entry', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.productCategorySubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)
.post('/product_category',
  (req, res, next) => {

    let db, status = "FAIL";

    if (!req.body.id) { // insert data 
      db = productCategoriesDb.addData(req.body);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...data} = req.body;
      db =  productCategoriesDb.updateData(req.body.id, data);
    }
    db.then(result => {
      if (result != null)
        status = "SUCCESS"
      res.json({ status: status, data: result });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  }
);

module.exports = router;