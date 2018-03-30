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

module.exports.uploadImage = function (req, res, next) {

  // 获取具体要上传到哪个目录
  let albumName = req.params.albumName;

  let rootDir = req.app.locals.rootDir;

  let fullPath = path.join(rootDir,albumName);

  //res.send(fullPath);

  let form = new formidable.IncomingForm();

  // 这个第三方包把文件暂时的放到了临时目录中
  form.parse(req, function(err, fields, files) {
    if (err) {
      return next(err);
    }
    let pic = files.pic;
    let size = pic.size;
    if(size>1024*1024){
      return res.send('too big, not allowed!');
    }
    let tempPath = pic.path;
    let extName = path.extname(pic.name);
    let distPath = path.join(fullPath,+new Date()+'')+extName;
    fs.rename(tempPath,distPath, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('back');
    });
  });
};