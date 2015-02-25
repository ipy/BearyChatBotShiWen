// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var shiwen = require('cloud/routes/shiwen');

// App 全局配置
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件


app.get('/', shiwen);
app.post('/', shiwen);

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();