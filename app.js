var express = require('express')
var path = require('path')
var router = require('./router')
var session = require('express-session')

var app = express()

app.engine('html',require('express-art-template'))
app.use('/public/',express.static(path.join(__dirname,'./public')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.set('views',path.join(__dirname,'./views/'))

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.listen(5000,function(){
    console.log('Server running')
})

//把路由挂载到 app中
app.use(router)


