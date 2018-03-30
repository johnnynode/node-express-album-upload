const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const config = require('./config');

// 创建一个app实例
const app = express();

// 设置模板引擎文件夹
app.set('views',path.join(__dirname,'views'));
// 设置ejs模板引擎
app.set('view engine','ejs');

// 设置虚拟目录和相关静态服务器文件夹
app.use('/www',express.static('www'));
app.use(express.static('root'));

// 解析post请求 之后通过 req.body 获取post请求体中的参数
app.use(bodyParser.urlencoded({ extended: false }));

// 挂载root文件夹
app.use(function (req,res,next) {
  app.locals.rootDir = config.rootDir;
  next();
});

// 挂载路由中间件
app.use(router);

// 挂载错误处理中间件
if (config.debug) {
  // 全局错误处理中间件
  app.use(function (err, req, res, next) {
    res.send(`Oh shit，something went wrong：${err.message}`);
  });
}

app.listen(3000,'127.0.0.1', function () {
  console.log('server is running at port 3000');
});