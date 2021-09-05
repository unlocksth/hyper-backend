let {
  listData,
  listActiveData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
}
  // = require('./memory/index') // switch out db as required
  = require('./mongod/index')
// = require('./pg/index')


let exportDb = {
  listData,
  listActiveData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
};

module.exports = exportDb;
