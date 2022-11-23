# 1.注册的路由
    利用UserModel.findOne来查找对应账号是否存在，如果不存在则将密码md5加密后save进去数据库，同时
    ``` 
    // 生成一个cookie(userid: user._id), 并交给浏览器保存，来解决一段时间内免登录
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
    ```

# 2.登录的路由
    利用 UserModel.findOne将加密后的md5密码传入查找，同时不让密码传入前端，需要进行过滤，findOne第二个属性可以设置过滤，过滤掉一些属性，比如密码，这样返回的就是一个纯净的数据
    ``` 
    const filter = {password: 0, __v: 0} // 指定过滤的属性
    UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    ```