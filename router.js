const express = require('express');
const router = express.Router();

const homeCtrl = require('./controller/home');

router.get('/', homeCtrl.renderHome);
router.get('/:albumName', ()=>{});
router.post('/album/:albumName', ()=>{});

module.exports = router;