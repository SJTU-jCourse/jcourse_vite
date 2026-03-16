# SJTU选课社区 前端

> 上海交通大学选课社区课程评价平台前端应用

这是 **SJTU选课社区** 的前端项目，基于 React 19 + TypeScript + Vite 构建的现代化单页应用（SPA）。

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite 8** - 构建工具
- **Ant Design v6** - UI 组件库（中文本地化）
- **React Router v7** - 路由管理
- **SWR** - 数据获取与缓存
- **React Markdown** - Markdown 渲染（支持 GFM、断行、安全过滤）

## 目录结构

```
src/
├── pages/           # 路由级页面组件
├── components/      # 可复用 UI 组件
├── services/        # API 层（SWR hooks 与异步函数）
├── lib/             # 工具函数与全局配置
│   ├── models.ts    # 共享 TypeScript 类型定义
│   ├── context.ts   # React Context 全局状态
│   ├── config.ts    # 应用级常量
│   ├── touchpoint.ts # 推广触点 ID
│   └── utils.ts     # Ant Design 表单验证规则
└── App.tsx          # 应用入口与路由定义
```

## 开发指南

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
pnpm dev
```

开发服务器会自动代理 `/api` 和 `/oauth` 请求到 `https://course.sjtu.plus`。

### 构建生产版本

```bash
pnpm build
```

该命令会先执行 TypeScript 类型检查，然后使用 Vite 构建生产版本。

### 代码检查与格式化

```bash
# ESLint 检查（零警告要求）
pnpm lint

# Prettier 格式化
pnpm format
```

### 预览生产构建

```bash
pnpm preview
```

## 核心架构

### 路由

应用使用 React Router v7 定义路由，包含两种布局：
- `BasicLayout` - 需要认证的页面，任何 403 响应会重定向到 `/login`
- `LoginLayout` - 登录流程布局

### 全局状态

`BasicLayout` 在加载时调用 `useCommonInfo()` 获取全局信息（`CommonInfo`），并通过 React Context 提供给所有子页面。包含：
- 当前用户信息
- 学期列表
- 公告列表
- 用户的评价与已选课程
- 推广活动

### 数据获取

服务层（`src/services/`）遵循两种模式：
- **SWR hooks** - 用于响应式数据，如 `useCourseDetail(id)`
- **异步函数** - 用于数据变更操作，如 `changeCourseNotificationLevel(...)`

共享的 axios 实例（`src/services/request.ts`）配置了 `withCredentials: true`，并自动处理 Django CSRF（从 `csrftoken` cookie 读取并发送 `X-CSRFToken` 请求头）。

### UI 设计

- 使用 Ant Design v6 组件库，启用中文语言包（`zhCN`）
- 暗色模式通过 `prefers-color-scheme` 媒体查询自动检测，使用 Ant Design 的 `theme.darkAlgorithm` 应用
- 品牌主色：`#1DA57A`

### Markdown 支持

评价内容支持 Markdown 渲染，使用以下插件：
- `react-markdown` - 核心渲染器
- `remark-gfm` - GitHub Flavored Markdown 支持
- `remark-breaks` - 换行符转换为 `<br>`
- `rehype-sanitize` - XSS 防护

## 开源许可

本项目采用 [GNU AGPL-3.0](LICENSE) 开源许可证。

## 相关链接

- 生产环境：https://course.sjtu.plus
- 后端仓库：[jcourse_api](https://github.com/SJTU-jCourse/jcourse_api)
