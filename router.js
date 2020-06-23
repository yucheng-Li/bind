// 路由设计

// 路径、方法、get参数、post参数、是否需要权限 、备注

var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser')
var user = require('./models/user')
var md5 = require('blueimp-md5')


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get('/',function(req,res){
    // req.session.user = 'ssss'
    console.log(req.session)
    res.render('index.html',{
        user:req.session.user
    })
})
router.get('/login',function(req,res){
    res.render('login.html')
})
router.post('/login',function(req,res){
    var body = req.body
    user.findOne({
        email:body.email,
        password:md5(body.password)
    },function(err,data){
        if(err){
            console.log('Login server is error!')
            return res.status(500).json({
                err_code:500,
                massage:'Login server is error!'
            })
        }
        if(!data){
            console.log('Email or name is wrong!')
            return res.status(200).json({
                err_code: 1,
                massage:'Email or name is wrong!'
            })
        }
        console.log('Login in successful')
        req.session.user = data 
        return res.status(200).json({
            err_code:0,
            massage:'Login in successful'
        })
    })
})
router.get('/logout',function(req,res){
    req.session.user = null
    res.redirect('/login')
})



router.get('/register',function(req,res){
    res.render('register.html')
})

// 1.获取表单提交的数据 req.body
// 2.操作数据库
    // 判断该用户是否已存在
    // 已存在，不允许注册
    // 不存在，注册新建用户
// 3.发送响应 
router.post('/register',function(req,res){
    var body = req.body
    body.password = md5(body.password)
    user.findOne({
        $or:[
            {
                email:body.email
            },
            {
                nickname:body.nickname
            }
        ]
    },function(err,data){
        if(err){
            return res.status(500).send('Server error')
        }
        if(data){
            err_code = 1
            console.log('Email or name is exitent')
            return res.status(200).json({
                err_code: 1,
                massage:'Email or name is exitent'
            })
           
        }else {
            var data = new user(body)
            data.save(function(err,ret){
                if(err){
                    console.log('save error')
                    return res.status(500).json({
                        err_code: 500,
                        massage:'save error'
                    })
                }
               
                console.log('save successful')
                console.log(body)
                req.session.user = body
                console.log(req.session)
                return res.status(200).json({
                    err_code: 0,
                    massage:'save successful'
                })
            })
        }
    })
})


module.exports = router