const express = require('express');
const router = express.Router();

router.get('/', ()=>{});
router.get('/:albumName', ()=>{});
router.post('/album/:albumName', ()=>{});

module.exports = router;