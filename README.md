# vue2.0_elm

### 简介
这是我发布的第一个项目，也是我目前为止做的较为全面的项目之一了。

本人也刚学完vue没多久，如果有哪里不足写的不对的地方，欢迎大家到csdn同名（weilangpu__）账号的博客下留言，我会去更改。

这个项目网上也有很多开源的，我也是用了他们的json文件自己做了一个，对刚学完vue2.x的人来说确实值得一练。

我的封装方法嵌套的层数会有点多，我是在某破站向coderwhy老师学习的封装方法，个人理解这种封装思路虽然层数会很多，但是结构真的很清晰，也很方便维护。
### 技术栈

* vue2.x
* vuex
* vue-router
* axios
* mock
* sass
* better-scroll
* moment.js

### 项目目录

```
src //项目源码
 |--assets	//资源
       |--css	//css资源
       |--fonticon	//icoMoon官网得图标字体
       |--img	//图片资源 下面的文件夹和组件名相对应
 |--common	//公共文件
 |--components	//组件
       |--common	//在其他项目中也有可能使用的组件
       |--content	//当前项目使用的组件
 |--mock	//mock.js相关文件
 |--network		//封装了网络请求的文件
 |--router		//封装路由
 |--store		//vuex
 |--views		//项目的主要界面
       |--detail	//详情界面
       |--goods		//商品界面
             |--childComps	//当前页面用到的子组件
       |--ratings	//评价界面
       |--seller	//商家界面
             |--childComps	//当前页面用到的子组件

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

