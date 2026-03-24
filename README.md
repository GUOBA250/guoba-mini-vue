# guoba-mini-vue

一个轻量级的 Vue 3 实现，包含响应式系统、虚拟 DOM、组件系统和编译器核心功能。这个项目主要用于学习和理解 Vue 3 的核心原理。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)]()

## 项目特点

- **响应式系统**：实现了 reactive、ref、computed 等响应式 API
- **虚拟 DOM**：包含完整的虚拟 DOM 创建、更新和 diff 算法
- **组件系统**：支持组件实例化、生命周期、props、slots 等
- **编译器**：实现了模板编译、AST 转换和代码生成
- **TypeScript**：使用 TypeScript 编写，提供完整的类型定义
- **模块化设计**：采用 monorepo 架构，各模块职责清晰

## 项目结构

```
guoba-mini-vue/
├── packages/
│   ├── reactivity/          # 响应式系统
│   ├── runtime-core/        # 运行时核心（平台无关）
│   ├── runtime-dom/         # DOM 平台实现
│   ├── compiler-core/       # 编译器核心
│   ├── shared/              # 共享工具函数
│   └── vue/                 # 完整的 Vue 实现
├── lib/                     # 构建产物
├── .backup/                 # 备份文件
└── package.json
```

## 安装

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/guoba-mini-vue.git
cd guoba-mini-vue

# 安装依赖
pnpm install
```

## 使用方法

### 基础使用

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

const App = {
  setup() {
    const state = reactive({
      count: 0
    })

    const increment = () => {
      state.count++
    }

    return {
      state,
      increment
    }
  },

  render() {
    return h('div', { onClick: this.increment }, `Count: ${this.state.count}`)
  }
}

createApp(App).mount('#app')
```

### 响应式 API

```javascript
import { reactive, ref, computed, effect } from 'guoba-mini-vue'

// reactive
const state = reactive({
  count: 0,
  name: 'guoba'
})

// ref
const count = ref(0)
console.log(count.value) // 0

// computed
const doubled = computed(() => count.value * 2)

// effect
effect(() => {
  console.log(`Count is: ${count.value}`)
})
```

### 组件使用

```javascript
import { createApp, h } from 'guoba-mini-vue'

const Child = {
  props: ['message'],
  render() {
    return h('div', this.message)
  }
}

const Parent = {
  setup() {
    return {
      message: 'Hello from Parent'
    }
  },
  render() {
    return h('div', [
      h(Child, { message: this.message })
    ])
  }
}

createApp(Parent).mount('#app')
```

## 开发

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试 UI
pnpm test:ui

# 生成测试覆盖率报告
pnpm test:coverage
```

### 构建

```bash
# 构建生产版本
pnpm build
```

构建产物会生成在 `lib/` 目录下：
- `guoba-mini-vue.cjs.js` - CommonJS 格式
- `guoba-mini-vue.esm.js` - ES Module 格式

### 代码格式化

```bash
# 格式化代码
pnpm format
```

## 文档

- [API 文档](./docs/API.md) - 详细的 API 参考
- [使用示例](./docs/EXAMPLES.md) - 丰富的使用示例
- [贡献指南](./docs/CONTRIBUTING.md) - 如何贡献代码
- [GitHub 上传指南](./docs/GITHUB_GUIDE.md) - 如何上传到 GitHub
- [更新日志](./CHANGELOG.md) - 版本更新记录

## 示例

项目包含多个示例，位于 `packages/vue/example/` 目录：

- `apilnject/` - provide/inject API 示例
- `compiler-base/` - 编译器基础示例
- `componenUpdate/` - 组件更新示例
- `nextTicker/` - nextTick 示例
- `patchChildren/` - 子节点更新示例
- `update/` - 响应式更新示例

每个示例都包含完整的 HTML、JavaScript 和使用说明。

## 核心功能

### 响应式系统

- `reactive` - 创建响应式对象
- `ref` - 创建响应式引用
- `computed` - 计算属性
- `effect` - 副作用函数
- `readonly` - 只读响应式对象
- `shallowReadonly` - 浅层只读响应式对象

### 运行时

- `createApp` - 创建应用实例
- `h` - 创建虚拟节点
- `nextTick` - 下次 DOM 更新后执行
- `provide/inject` - 依赖注入

### 编译器

- 模板解析
- AST 转换
- 代码生成
- 插件系统

## 技术栈

- **TypeScript** - 类型安全
- **Rollup** - 模块打包
- **Vitest** - 测试框架
- **pnpm** - 包管理器

## 测试

项目使用 Vitest 进行测试，当前测试覆盖：

- 响应式系统测试（37 个测试用例）
- 编译器测试（包含快照测试）
- 运行时测试

所有测试都能通过，确保代码质量。

## 贡献

欢迎贡献代码！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细的贡献指南。

## 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 学习资源

这个项目适合用来学习 Vue 3 的核心原理，建议配合以下资源：

- Vue 3 官方文档
- Vue 3 源码
- 相关技术博客和视频教程

## 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request。

## 更新日志

### v1.0.0

- 初始版本发布
- 实现响应式系统
- 实现虚拟 DOM
- 实现组件系统
- 实现编译器核心
- 完成测试覆盖
