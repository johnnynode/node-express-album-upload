const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

// 列出相册中的图片
module.exports.showAlbum = function (req, res, next) {
  let albumName = req.params.albumName;
  let rootDir = req.app.locals.rootDir;
  let fullPath = path.join(rootDir, albumName);
  fs.readdir(fullPath, function (err, files) {
    if (err) {
      return next(err);
    }
    let srcs = [];
    files.forEach(function (item) {
      if (fs.statSync(path.join(fullPath, item)).isFile()) {
        srcs.push(`/${albumName}/${item}`);
      }
    });
    res.render('album', {
      srcs: srcs,
      title:albumName,
      uploadUrl:`/album/${albumName}`
    });
  });
};


