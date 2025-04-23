
# 青穗工坊

## 项目简介

青穗工坊是一个面向校园的综合服务平台，为学生提供校园任务、兼职招聘和简历管理等功能。平台旨在连接有需求的学生与可提供服务的学生，同时为学生提供就业与实习机会。

## 技术栈

### 前端
- 框架：uni-app (Vue.js)
- 跨平台支持：H5、微信小程序等
- UI：自定义组件与样式

### 后端
- 框架：ThinkPHP 6.0
- 环境：PHP 7.2+（兼容PHP 8.1）
- 数据库：MySQL

## 功能特性

- 用户认证与管理
- 校园任务发布与接取
- 任务状态跟踪与管理
- 职位信息浏览与申请
- 简历上传与管理
- 个人中心与数据统计

## 安装说明

### 前端

1. 安装依赖
```bash
cd 前端
npm install
```

2. 开发模式运行
```bash
npm run dev:h5  # H5平台
# 或
npm run dev:mp-weixin  # 微信小程序
```

3. 打包构建
```bash
npm run build:h5  # H5平台
# 或
npm run build:mp-weixin  # 微信小程序
```

### 后端

1. 环境要求
   - PHP >= 7.2
   - MySQL >= 5.7
   - Composer

2. 安装依赖
```bash
cd 后端
composer install
```

3. 配置数据库
   - 复制 `.env.example` 为 `.env`
   - 修改数据库配置

4. 初始化数据库
```bash
php think migrate:run
php think seed:run
```

5. 启动服务
```bash
php think run
```

## 目录结构

### 前端
```
前端/
├── pages/             # 页面文件
│   ├── index/         # 首页
│   ├── login/         # 登录页
│   ├── tasks/         # 校园任务相关页面
│   ├── jobs/          # 职位相关页面
│   ├── resume/        # 简历相关页面
│   └── my/            # 个人中心
├── static/            # 静态资源
├── uni_modules/       # uni-app模块
├── utils/             # 工具函数
├── config/            # 配置文件
├── App.vue            # 应用入口
├── main.js            # 主入口文件
└── pages.json         # 页面配置
```

### 后端
```
后端/
├── app/               # 应用目录
├── config/            # 配置目录
├── database/          # 数据库相关
├── public/            # 公共资源
├── route/             # 路由配置
├── runtime/           # 运行时目录
└── vendor/            # 第三方依赖
```

## API接口

### 用户认证
- `POST /user/login` - 登录
- `POST /user/get_info` - 获取用户信息

### 校园任务
- `POST /task/create` - 创建任务
- `GET /task/list` - 获取任务列表
- `GET /task/detail` - 获取任务详情
- `POST /task/accept` - 接受任务
- `POST /task/complete` - 完成任务

### 职位管理
- `GET /jobs` - 获取职位列表
- `GET /jobs/:id` - 获取职位详情
- `POST /job/apply` - 申请职位

### 简历管理
- `POST /resume/upload` - 上传简历
- `GET /resume/list` - 获取简历列表
- `POST /resume/delete` - 删除简历

## 部署说明

1. 前端部署
   - 将构建后的dist目录部署到静态资源服务器或CDN

2. 后端部署
   - 配置Web服务器（Apache/Nginx）
   - 设置域名解析
   - 配置HTTPS证书
   - 设置生产环境参数

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

该项目基于Apache 2.0许可证开源，详见LICENSE文件。

## 联系方式

项目维护者：[您的名字] - [您的邮箱]

项目链接：[https://github.com/yourusername/qingsuigongfang](https://github.com/yourusername/qingsuigongfang)
