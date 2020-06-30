# xgkj后台模板工程

#### 项目介绍
zj2y_app系统基础模板
技术栈：VUE-cli3.0+Mint+mock.js

#### 安装教程

1. 克隆到本地
    ```
    git clone https://gitee.com/xuegekeji/zj2y_app.git
    ```
2. 安装依赖
    ```
    npm install
    ```
3. 启动项目
   ```
   npm run dev
   ```
4. 启动网站
   
   npm run server

#### 目录结构

```
.
├── config  开发相关配置
├── public  打包所需静态资源
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  公共组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── view  页面文件
    ├── globalRegistration  全局注册
    └── tests  测试相关
└── vue.config.js VUE-CLI配置文件
```
