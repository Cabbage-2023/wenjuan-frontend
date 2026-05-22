# 小慕问卷 — B 端（管理后台）

问卷平台的 **B 端（管理后台）**——面向问卷创建者和数据分析者。提供问卷创建、编辑、发布、数据统计等完整功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| TypeScript | 6 | 类型安全 |
| Vite | 8 | 构建工具 |
| Ant Design | 6 | UI 组件库 |
| Redux Toolkit | 2 | 状态管理 |
| redux-undo | — | 撤销/重做 |
| React Router | 7 | 路由 |
| Axios | 1 | HTTP 请求 |
| ahooks | 3 | Hooks 库（useRequest / useKeyPress 等） |
| @dnd-kit | 6/10 | 拖拽排序 |
| Recharts | 3 | 统计图表 |
| qrcode.react | 4 | 二维码生成 |
| dayjs | 1 | 日期处理 |
| mockjs | 1 | Mock 数据 |
| nanoid | — | ID 生成 |
| Storybook | 10 | 组件开发/文档 |
| Vitest | 4 | 单元测试 |
| Playwright | — | 浏览器自动化测试 |
| SCSS | — | 样式预处理 |

## 路由结构

```
/                     → 首页（引导页/营销页）
/login                → 登录
/register             → 注册
/manage/list          → 我的问卷（无限滚动列表）
/manage/star          → 星标问卷
/manage/trash         → 回收站
/question/edit/:id    → 问卷编辑器（核心功能）
/question/stat/:id    → 数据统计面板
*                     → 404
```

## 项目结构

```
src/
├── main.tsx                         # 入口：挂载 Redux Provider
├── App.tsx                          # 根组件
├── router/index.tsx                 # 路由配置（懒加载 Edit/Stat 页面）
├── layouts/
│   ├── MainLayout.tsx               # 主布局：Header(Logo + 用户信息) + Content + Footer
│   ├── ManageLayout.tsx             # 管理页布局：侧边栏 + 内容区
│   └── QuestionLayout.tsx           # 问卷布局：纯内容（编辑/统计页共用）
├── pages/
│   ├── Home.tsx                     # 首页：品牌介绍 + 引导按钮
│   ├── Login.tsx                    # 登录：JWT + 记住密码
│   ├── Register.tsx                 # 注册：用户名/密码/昵称/确认密码
│   ├── NotFound.tsx                 # 404 页
│   ├── manage/
│   │   ├── List.tsx                 # 我的问卷（无限滚动/搜索/防抖加载）
│   │   ├── Star.tsx                 # 星标问卷（分页列表）
│   │   └── Trash.tsx                # 回收站（表格 + 批量恢复/彻底删除）
│   └── question/
│       ├── Edit/                    # 问卷编辑器
│       │   ├── index.tsx            #   三栏布局：Left + Canvas + Right
│       │   ├── EditHeader.tsx       #   顶部栏：标题编辑 + 保存(手动/自动/快捷键) + 发布
│       │   ├── EditCanvas.tsx       #   画布：渲染组件 + 选中 + 拖拽排序
│       │   ├── EditToolbar.tsx      #   工具栏：删除/隐藏/锁定/复制/粘贴/上移/下移/撤销/重做
│       │   ├── LeftPanel.tsx        #   左侧面板（Tab 切换）
│       │   ├── ComponentLib.tsx     #     组件库：按分组展示，点击添加到画布
│       │   ├── Layers.tsx           #     图层管理：显示/隐藏/锁定/重命名/拖拽排序
│       │   ├── RightPanel.tsx       #   右侧面板（Tab 切换）
│       │   ├── ComponentProp.tsx    #     组件属性编辑（根据选中类型动态渲染）
│       │   └── PageSetting.tsx      #     页面设置：标题/描述/CSS/JS
│       └── Stat/                    # 数据统计
│           ├── index.tsx            #   三栏布局：ComponentList + PageStat + ChartStat
│           ├── StatHeader.tsx       #   顶部栏：问卷链接 + 复制 + 二维码 + 返回编辑
│           ├── ComponentList.tsx    #   左侧：问卷组件列表（点击选中查看统计）
│           ├── PageStat.tsx         #   中间：答卷数据表格（分页）
│           └── ChartStat.tsx        #   右侧：图表统计（根据组件类型渲染不同图表）
├── components/
│   ├── Logo.tsx                     # 品牌 Logo
│   ├── UserInfo.tsx                 # 用户信息显示/退出登录
│   ├── QuestionCard.tsx             # 问卷卡片：编辑/统计/标星/复制/删除操作
│   ├── ListSearch.tsx               # 搜索框（关键词搜索，URL 驱动）
│   ├── ListPage.tsx                 # 分页组件（URL 驱动）
│   ├── DragSortable/
│   │   ├── SortableContainer.tsx    # 拖拽排序容器（@dnd-kit 封装）
│   │   └── SortableItem.tsx         # 可拖拽项
│   └── QuestionComponents/          # 7 种问卷组件（每种含 Component + PropComponent + StatComponent）
│       ├── QuestionInput/           #   输入框：标题 + placeholder
│       ├── QuestionTextarea/        #   多行输入：标题 + placeholder
│       ├── QuestionTitle/           #   标题：文字 + 级别(h1-h5) + 居中
│       ├── QuestionParagraph/       #   段落：文本(支持换行) + 居中
│       ├── QuestionInfo/            #   问卷信息：标题 + 描述
│       ├── QuestionRadio/           #   单选：动态选项 + 默认值 + 垂直/水平
│       └── QuestionCheckbox/        #   多选：动态选项 + 默认选中 + 垂直/水平
├── hooks/
│   ├── useLoadQuestionData.ts       # 加载问卷数据 → 写入 Redux（componentList + pageInfo）
│   ├── useLoadQuestionListData.ts   # 加载问卷列表（URL 参数驱动）
│   ├── useGetComponentInfo.ts       # 从 Redux 读取组件列表/选中状态
│   ├── useGetPageInfo.ts            # 从 Redux 读取页面信息
│   ├── useGetUserInfo.ts            # 从 Redux 读取用户信息
│   ├── useLoadUserData.ts           # 加载用户数据（Token 存在时自动请求）
│   ├── useNavPage.ts                # 路由守卫：登录重定向
│   └── useBindCanvasKeyPress.ts     # 画布快捷键：删除/复制/粘贴/上移/下移/撤销/重做
├── store/
│   ├── index.ts                     # Redux Store 配置（含 redux-undo）
│   ├── userReducer.ts               # 用户信息(username, nickname)
│   ├── pageInfoReducer.ts           # 页面信息(title, desc, js, css, isPublished)
│   └── componentsReducer/
│       ├── index.ts                 # 组件列表 CRUD + 选中/隐藏/锁定/复制/粘贴/排序(含 redux-undo)
│       └── utils.ts                 # getNextSelectedId / insertNewComponent 工具函数
├── services/
│   ├── ajax.ts                      # Axios 实例 + 请求拦截器(JWT) + 响应拦截器(errno 校验)
│   ├── question.ts                  # 问卷 API：获取/创建/列表/更新/复制/删除
│   ├── user.ts                      # 用户 API：注册/登录/获取信息
│   └── stat.ts                      # 统计 API：答卷列表/组件统计
├── constant/
│   ├── index.ts                     # 常量：分页参数名/每页条数/统计颜色
│   └── index2.ts                    # 路由路径常量 + 路由守卫工具函数
├── utils/
│   └── user-token.ts                # Token 本地存储(get/set/remove)
├── _mock/index.ts                   # mockjs 本地模拟（开发备用）
├── stories/                         # Storybook 组件故事
└── styles/                          # SCSS 模块样式
```

## 功能详解

### 1. 用户体系

- **注册**：用户名（5-20位字母数字下划线）+ 昵称 + 密码 + 确认密码校验
- **登录**：JWT 认证，支持"记住密码"（本地存储），登录成功后 Token 自动注入后续请求
- **路由守卫**：未登录用户访问管理页自动跳转登录，已登录用户访问登录页自动跳转管理页
- **退出登录**：清除 Token 和 Redux 状态

### 2. 问卷管理

| 页面 | 功能 |
|------|------|
| **我的问卷** | 无限滚动列表、关键词搜索、防抖加载 |
| **星标问卷** | 标星/取消标星、分页列表、关键词搜索 |
| **回收站** | 表格展示、多选批量恢复、批量彻底删除（含确认弹窗） |

**问卷卡片操作**：编辑问卷、数据统计、标星/取消标星、复制、删除（移入回收站）

### 3. 问卷编辑器（核心）

**三栏布局**：组件库/图层 | 画布 | 属性/页面设置

#### 左侧面板
- **组件库**：按"文本显示"、"用户输入"、"用户选择"分组展示，点击添加到画布
- **图层**：显示所有组件列表，支持显示/隐藏、锁定/解锁、点击重命名、拖拽排序

#### 画布区域
- 渲染所有组件，支持点击选中
- **拖拽排序**：使用 @dnd-kit 实现拖拽调整组件顺序
- **快捷键**（自动判断焦点避免干扰输入框）：

| 快捷键 | 操作 |
|--------|------|
| Delete / Backspace | 删除选中组件 |
| Ctrl+C / ⌘C | 复制 |
| Ctrl+V / ⌘V | 粘贴 |
| ↑ / ↓ | 选中上/下一个组件 |
| Ctrl+Z / ⌘Z | 撤销 |
| Ctrl+Y / ⌘Y | 重做 |

#### 右侧面板
- **属性**：选中组件后显示对应属性编辑表单（动态渲染：输入框、单选选项管理、多选选项管理等）
- **页面设置**：问卷标题、描述、自定义 CSS、自定义 JS

#### 顶部工具栏
- **标题编辑**：点击标题进入编辑模式
- **操作按钮**：删除、隐藏、锁定、复制、粘贴、上移、下移、撤销、重做
- **保存**：手动保存（Ctrl+S）+ 自动保存（1 秒防抖）
- **发布**：发布确认 → 设置 isPublished → 跳转统计页

### 4. 数据统计

**三栏布局**：组件列表 | 答卷数据 | 图表统计

- **组件列表**：点击选中组件，右侧自动切换到对应统计视图
- **答卷数据**：分页表格，每列对应一个问卷组件
- **图表统计**：
  - 单选项 → 饼图（显示百分比）
  - 多选项 → 柱状图
  - 输入框类 → 提示"该组件无统计图表"
- **问卷链接**：展示 C 端问卷链接，支持一键复制和二维码生成
- **未发布提示**：若问卷未发布则显示警告，禁止查看统计

### 5. 7 种问卷组件

| 组件 | 类型标识 | 渲染 | 可编辑属性 | 统计图表 |
|------|---------|------|-----------|---------|
| 标题 | questionTitle | h1-h5 | 文字、级别、居中 | — |
| 段落 | questionParagraph | 段落文本 | 文字（支持换行）、居中 | — |
| 问卷信息 | questionInfo | 居中标题+描述 | 标题、描述 | — |
| 输入框 | questionInput | 单行输入 | 标题、placeholder | — |
| 多行输入 | questionTextarea | 多行输入 | 标题、placeholder | — |
| 单选 | questionRadio | Radio 组 | 标题、选项（动态增删/去重检查）、默认值、垂直/水平 | 饼图 |
| 多选 | questionCheckbox | Checkbox 组 | 标题、选项（动态增删/默认选中）、垂直/水平 | 柱状图 |

每个组件同目录下包含：
- `Component.tsx` — 画布渲染 + C 端渲染
- `PropComponent.tsx` — B 端属性编辑表单
- `StatComponent.tsx` — 统计图表（仅单选/多选有）
- `interface.ts` — 类型定义 + 默认属性
- `Component.test.tsx` — 单元测试

### 6. 状态管理

Redux Toolkit + redux-undo（支持撤销/重做，最多 20 步历史）：

- **user**：username, nickname
- **components**（含 undo/redo）：componentList, selectedId, copiedComponent
- **pageInfo**：title, desc, js, css, isPublished

### 7. 网络层

Axios 封装（`services/ajax.ts`）：

- **请求拦截器**：自动注入 `Authorization: Bearer <token>`
- **响应拦截器**：统一检查 `errno` 字段，非 0 自动弹出错误提示
- **响应格式**：`{ errno: 0, data }` 成功 / `{ errno: -1, msg }` 失败

## 环境变量

```
# .env.development
VITE_BASE_URL=http://localhost:3005        # 后端 API 地址（开发环境直连）
VITE_C_SIDE_URL=http://localhost:8000      # C 端地址（用于生成问卷链接）

# .env.production
VITE_BASE_URL=                              # 空字符串，走 Nginx 相对路径 /api 代理
VITE_C_SIDE_URL=http://natsumeai.icu:3000   # 生产 C 端地址
```

## 本地开发

```bash
npm install
npm run dev          # http://localhost:8000
npm run storybook    # Storybook http://localhost:6006
npm run test         # Vitest 单元测试
npm run coverage     # 测试覆盖率
npm run analyze      # 包体积分析
```

## 构建与部署

```bash
npm run build        # 输出到 dist/
```

生产环境基于 Nginx 多阶段构建 Docker 镜像：

```dockerfile
# 第一阶段：Node 构建
FROM node:20-alpine
RUN npm run build

# 第二阶段：Nginx 运行
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Nginx 配置要点：
- 端口 `3001` 提供 SPA（`try_files $uri /index.html` 解决刷新 404）
- `/api/` 路径代理到后端容器 `http://backend:3005`
- 启用了 Gzip 压缩
- 同一容器内还通过端口 `3002` 提供另一个项目（爱彼迎）

## Vite 打包优化

通过 `rollupOptions.output.manualChunks` 精细控制分包策略：

| Chunk | 内容 |
|-------|------|
| antd-core | Ant Design 业务组件 |
| antd-icons | @ant-design/icons |
| charts-vendor | recharts / d3（仅统计页使用，首屏不加载） |
| reactDom-chunk | react-dom |
| vendors-chunk | 其余 node_modules |
| 各页面独立 | Edit / Stat 代码分割，懒加载 |

## 颜色主题

统计图表色板以"初音绿"（#39C5BB）为核心，搭配天空蓝、苍蓝、樱花粉、电音紫、深青色，兼顾视觉一致性与区分度。

## 相关仓库

- **C 端（用户端）**：[wenjuan-client](https://github.com/Cabbage-2023/wenjuan-client)
- **后端 API**：[wenjuan-backend](https://github.com/Cabbage-2023/wenjuan-backend)
- **Mock 服务**：[wenjuan-mock](https://github.com/Cabbage-2023/wenjuan-mock)（开发阶段替代后端）
