const express=require('express');
const { getLogs,postLogs } = require('../controllers/logsController');
const router=express.Router();

router.get('/',getLogs);
router.post('/', postLogs);

module.exports=router;