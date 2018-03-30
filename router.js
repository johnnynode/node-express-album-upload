const express = require('express');
const router = express.Router();

const homeCtrl = require('./controller/home');
const albumCtrl = require('./controller/album');

router.get('/', homeCtrl.renderHome);
router.get('/:albumName', albumCtrl.showAlbum);
router.post('/album/:albumName', albumCtrl.uploadImage);

module.exports = router;