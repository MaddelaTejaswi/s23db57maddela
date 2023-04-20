var express = require('express');
const queen_controlers= require('../controllers/queen');
var router = express.Router();
/* GET queens */
router.get('/', queen_controlers.queen_view_all_Page );
/* GET detail queen page */
router.get('/detail', queen_controlers.queen_view_one_Page);
module.exports = router;