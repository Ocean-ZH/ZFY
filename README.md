# ZFY
indie project

javascript 构建的一个小游戏

施工中...

# 本地运行方法：

安装[node.js环境](https://nodejs.org/en/)

```
cd node-pack
node app.js
```
或者安装使用[nodemon](https://www.npmjs.com/package/nodemon)实现自动重启的node服务
```
nodemon app.js
```


由于使用了ES6的module进行模块化
浏览器禁止使用file协议进行ES6的import加载
故需要搭建一个简单的服务器环境，在http协议下访问
这里使用的是node.js
实际上根据个人情况，将indie文件夹放入自己的服务器中也是可行的
