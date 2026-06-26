# LiveCopilot AI 嘴替直播工作台

为电商直播间提供"直播间画面搭建 + 话术生成 + 商品讲解 + 场控协作 + AI 语音/数字人嘴替 + RTMP 推流"的一体化工具前端原型。

## 技术栈

- React 19 + Vite 6
- React Router 6（HashRouter）
- lucide-react 图标库
- 纯前端 mock 数据，无后端 API

## 快速开始

```bash
git clone https://github.com/wangduo0625/live-workbench.git
cd live-workbench
npm install
npm run dev
```

访问 http://localhost:5173

## 构建部署

```bash
npm run build      # 构建到 dist/
npm run preview    # 本地预览构建产物
```

Vercel 部署：导入 GitHub 仓库，Framework Preset 选 Vite，自动识别构建配置。

## 项目结构

```
live-workbench/
├── index.html              # 入口 HTML
├── package.json            # 依赖和脚本
├── vite.config.mjs         # Vite 配置
├── public/
│   └── products/           # 5 张 AI 生成的商品图片
├── src/
│   ├── main.jsx            # React 入口
│   ├── App.jsx             # 路由配置（9 个路由）
│   ├── styles.css          # 全局样式（Clean Blue 浅色主题）
│   ├── components/
│   │   ├── Layout.jsx      # 侧边栏布局（直播间/商品库/推流监控）
│   │   └── ProductForm.jsx # 手动创建商品表单组件
│   └── pages/
│       ├── Dashboard.jsx       # 直播间列表页
│       ├── CreateRoom.jsx      # 创建直播间向导（7步）
│       ├── ProductLibrary.jsx  # 商品库（全局商品档案管理）
│       ├── RoomProducts.jsx    # 直播间商品配置（话术/动作/TTS）
│       ├── PreviewConfig.jsx   # 画面与预览（背景/TTS/嘴形/AI生成背景）
│       ├── Simulate.jsx        # 模拟开播（链路验证+画面确认+正式开播）
│       ├── Workbench.jsx       # 导播台（商品队列/预览/AI播报/评论/求助）
│       ├── PresenterView.jsx   # 真人展示台（动作指令/求助场控）
│       ├── StreamMonitor.jsx   # 推流监控（码率/帧率/告警日志）
│       └── DataReview.jsx      # 数据复盘（GMV/商品表现/话术采纳/评论热点）
```

## 页面导航说明

### 侧边栏全局入口（3个）
- **直播间** — 直播间列表，所有直播间的入口
- **商品库** — 全局商品档案管理，跨直播间共享复用
- **推流监控** — 推流链路健康监控

### 直播间级别页面（从直播间列表进入）
- **商品配置** — 直播间商品队列、专属话术、展示动作、TTS 配置
- **画面与预览** — 背景模板、TTS 音色、嘴形替换、AI 生成背景、实时预览
- **模拟开播** — 端到端链路验证 + 画面确认 + 正式开播推流
- **数据复盘** — 直播数据、商品表现、话术采纳率、评论热点

### 全屏独立页面（从直播间列表新标签页打开）
- **导播台** — 场控一屏操作（商品队列/合成预览/AI播报/评论池/求助信号）
- **真人展示台** — 真人看动作指令（当前动作/下一动作/求助场控）

## 核心业务逻辑

### 两层商品架构
1. **商品库（全局）** — 商品档案管理，导入后自动生成基础话术和基础动作
2. **直播间商品配置（房间级）** — 从商品库关联商品，基于直播间人设/目标/模板/模式生成专属话术和动作

### 话术生成两层架构
- **基础话术**（商品库层）— 基于商品信息生成中性版话术，跨直播间复用
- **专属话术**（直播间层）— 基于基础话术 + 直播间上下文（人设/目标/模板/模式）重新生成

### 模拟开播三阶段
1. **链路验证** — 6 步自动验证（商品资料→话术合规→TTS→嘴形→混流→推流）
2. **画面确认** — 实时画面预览 + 画面确认清单
3. **正式开播** — 推流到平台，进入导播台

## 设计主题

Clean Blue 浅色主题：白底 + 电光蓝操作色，金额用琥珀金。

## 在线预览

https://live-workbench.vercel.app

## License

Private
