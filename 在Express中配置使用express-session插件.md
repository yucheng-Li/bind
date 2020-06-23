## 在Express中配置使用express-session插件

### 1.安装
```js
npm i express-session
```

### 2.配置
```js

var express = require('express')
var session = require('express-session')
var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

```

### 3.使用
```js
//添加 Session 数据
req.session.foo = 'bar'

//获取 Session 数据
req.session.foo
```

`提示：默认Session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把Session进行持久化存储`