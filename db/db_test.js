//测试使用mongoose操作mongodb数据库

// 引入md5加密
const md5 = require('blueimp-md5') //加密的函数
// 1.引入mongoose
const mongoose = require('mongoose')
// 1.2 连接指定数据库（URL只有数据库是变化的）
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
// 1.3 获取连接对象
const conn = mongoose.connection
// 1.4 绑定连接完成的监听（用来提示连接成功）
conn.on('connected', function () { // 连接成功回调
  console.log('数据库连接成功, YE!!!')
})
// 2. 得到对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({ //指定文档结构：属性名，必须值，默认值
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密 码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
    })
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合名: users
// 3.通过Model或其实例对集合数据进行CRUD操作
// 3.1 通过Model实例的save（）添加数据
function testSave(){
    // 创建UserModel的实例
    const userModel =  new UserModel({username:'zhangqilong',password:md5('123'),type:'dashen'})
    //调用save()保存
    userModel.save(function(error,user){
        console.log('save()',error,user);
    })
}
// testSave()
// 3.2通过Model的find()/findOne()查询多个或一个数据
function testFind(){
    // 查询多个:得到是包含所有匹配对象的数组，如果没有匹配的就是[]
    UserModel.find({_id:'634d4689be4d7a34b4eaab43'},function (error,users){
        console.log('find()',error,users._doc);
    })
    // 查询一个：得到的是一个匹配的文档对象，如果没有匹配到就是null
    UserModel.findOne({_id:'634d4689be4d7a34b4eaab43'},function(error,user){
        console.log("findOne()",error,user._doc);
    })
}
// testFind();
// 3.3。通过Model的findByIdAndUpdate更新某个数据
function testUpdata(){
    UserModel.findByIdAndUpdate({_id:'634d4689be4d7a34b4eaab43'},{username:'ly'},function(error,oldUser){
        console.log('findByIdAndUpdate',oldUser);
    })
}
// testUpdata()
// 3.4 通过Model的remove（）删除匹配的数据
function testDelete(){
    UserModel.remove({_id:'634d4689be4d7a34b4eaab43'},function(error,doc){
        console.log(doc);
    }) 
}
testDelete()