var express = require('express');
const queen_controlers= require('../controllers/queen');
var router = express.Router();
/* GET queen */
router.get('/', queen_controlers.queen_view_all_Page );
/* GET detail queen page */
router.get('/detail', queen_controlers.queen_view_one_Page);
/* GET create queen page */
router.get('/create', queen_controlers.queen_create_Page);
/* GET create update page */
router.get('/update', queen_controlers.queen_update_Page);
/* GET delete queen page */
router.get('/delete', queen_controlers.queen_delete_Page);

module.exports = router;