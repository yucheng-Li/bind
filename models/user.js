//1.引用mongoose核心模块
var mongoose = require('mongoose')
//2。连接数据库
mongoose.connect('mongodb://localhost/user')
//3.设计表结构
var Schema = mongoose.Schema
var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    create_time:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'/public/img/avatar-default.png'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[0,1],
        default:0
    },
    birthday:{
        type:Date
    },
    status:{
        type:Number,
        // 0 不限制
        // 1 不可以评论
        // 2 不可以登录
        enum:[0,1,2],
        default:0
    }

})
// 4.将文档结构发布为模型
var User = mongoose.model('User',userSchema)

//5.新增数据
// var admin = new User({
//     email:'244065684@qq.com',
//     nickname:'禹城人',
//     password:'123'
// })
// admin.save(function(err,ret){
//     if(err){
//         console.log('保存失败')
//         throw err
//     }
//     console.log('保存成功')
//     console.log(ret)
// })

// 6.查询数据
User.find(function(err,ret){
    if(err){
        console.log('查询失败')
        return err
    }
    console.log(ret)
    console.log(ret.length)
})
//7.删除数据
// User.remove({
//     avatar: '/public/img/avatar-default.png'
// },function(err,ret){
//     if(err){
//         console.log('删除失败')
//         return err
//     }
// })




//将包引出
module.exports = mongoose.model('User',userSchema)

 