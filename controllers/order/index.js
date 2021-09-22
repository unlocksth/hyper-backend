let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  reportFilter
}
  // = require('./memory/index') // switch out db as required
  = require('./mongod/index')
// = require('./pg/index')


let exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  reportFilter
};

module.exports = exportDb;
