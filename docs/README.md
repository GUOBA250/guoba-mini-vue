# 文档索引

欢迎来到 guoba-mini-vue 文档中心！这里包含了项目的所有文档资源。

## 快速导航

- [项目概述](#项目概述)
- [开始使用](#开始使用)
- [API 参考](#api-参考)
- [示例代码](#示例代码)
- [开发指南](#开发指南)
- [GitHub 相关](#github-相关)

---

## 项目概述

### [README.md](../README.md)
项目的自述文件，包含：
- 项目简介
- 功能特点
- 安装步骤
- 基础使用方法
- 项目结构
- 技术栈

**适合人群**：所有用户

---

## 开始使用

### [EXAMPLES.md](./EXAMPLES.md)
详细的使用示例，涵盖：
- 基础示例（计数器、响应式对象、计算属性）
- 响应式系统（reactive、ref、computed、effect、readonly）
- 组件系统（基础组件、组件通信、provide/inject、组件更新）
- 虚拟 DOM（创建虚拟节点、子节点更新、nextTick）
- 编译器（基础编译、模板转换）
- 完整示例项目（Todo List）

**适合人群**：初学者、想要快速上手的开发者

---

## API 参考

### [API.md](./API.md)
完整的 API 文档，包含：

#### 响应式 API
- [reactive](./API.md#reactive) - 创建响应式对象
- [ref](./API.md#ref) - 创建响应式引用
- [computed](./API.md#computed) - 创建计算属性
- [effect](./API.md#effect) - 注册副作用函数
- [readonly](./API.md#readonly) - 创建只读对象
- [shallowReadonly](./API.md#shallowreadonly) - 创建浅层只读对象
- [isReactive](./API.md#isreactive) - 检查是否是响应式对象
- [isReadonly](./API.md#isreadonly) - 检查是否是只读对象
- [isProxy](./API.md#isproxy) - 检查是否是代理对象
- [isRef](./API.md#isref) - 检查是否是 ref 对象
- [unRef](./API.md#unref) - 解包 ref
- [proxyRefs](./API.md#proxyrefs) - 代理 ref 属性
- [stop](./API.md#stop) - 停止副作用

#### 运行时 API
- [createApp](./API.md#createapp) - 创建应用实例
- [h](./API.md#h) - 创建虚拟节点
- [nextTick](./API.md#nexttick) - 下次 DOM 更新后执行
- [provide](./API.md#provide) - 提供依赖
- [inject](./API.md#inject) - 注入依赖
- [getCurrentInstance](./API.md#getcurrentinstance) - 获取当前组件实例
- [setCurrentInstance](./API.md#setcurrentinstance) - 设置当前组件实例
- [registerRuntimeCompiler](./API.md#registerruntimecompiler) - 注册运行时编译器

#### 虚拟节点 API
- [createTextVnode](./API.md#createtextvnode) - 创建文本虚拟节点
- [createElementVNode](./API.md#createelementvnode) - 创建元素虚拟节点
- [renderSlots](./API.md#renderslots) - 渲染插槽
- [toDisplayString](./API.md#todisplaystring) - 转换为显示字符串

每个 API 都包含：
- 详细的参数说明
- 返回值说明
- 使用示例
- 注意事项
- 错误处理

**适合人群**：需要详细了解 API 的开发者

---

## 开发指南

### [CONTRIBUTING.md](./CONTRIBUTING.md)
贡献指南，包含：

#### 贡献流程
- 如何贡献代码
- 报告 Bug
- 提出新功能
- 提交 Pull Request

#### 开发环境
- 开发环境设置
- 代码规范
- 测试规范
- 提交规范

#### Pull Request 流程
- 创建分支
- 进行开发
- 提交更改
- 创建 PR
- 等待审查
- 合并

#### 文档贡献
- Bug 报告模板
- 功能请求模板
- 文档改进指南

**适合人群**：想要贡献代码的开发者

---

## GitHub 相关

### [GITHUB_GUIDE.md](./GITHUB_GUIDE.md)
GitHub 上传指南，包含：

#### 准备工作
- 安装 Git
- 创建 GitHub 账号
- 配置 Git 用户信息
- 生成 SSH 密钥

#### 仓库管理
- 创建 GitHub 仓库
- 配置 Git
- 提交代码
- 设置分支保护
- 发布版本

#### 持续集成
- 创建 GitHub Actions 工作流
- 配置 CI/CD
- 自动化测试

#### 日常开发
- 创建功能分支
- 提交更改
- 创建 Pull Request
- 合并 PR
- 发布版本

#### 常见问题
- 推送权限错误
- .gitignore 不生效
- 分支保护阻止推送
- CI 检查失败
- 标签推送失败

**适合人群**：想要将项目上传到 GitHub 的开发者

---

## 其他资源

### 项目示例

项目包含多个示例，位于 `packages/vue/example/` 目录：

- `apilnject/` - provide/inject API 示例
- `compiler-base/` - 编译器基础示例
- `componenUpdate/` - 组件更新示例
- `nextTicker/` - nextTick 示例
- `patchChildren/` - 子节点更新示例
- `update/` - 响应式更新示例

每个示例都包含完整的 HTML、JavaScript 和使用说明。

### 测试文件

测试文件位于各个包的 `_tests_` 目录：

- `packages/reactivity/_tests_/` - 响应式系统测试
- `packages/compiler-core/_tests_/` - 编译器测试
- `packages/runtime-core/_tests_/` - 运行时核心测试

### 源代码

主要源代码位于 `packages/` 目录：

- `packages/reactivity/` - 响应式系统实现
- `packages/runtime-core/` - 运行时核心实现
- `packages/runtime-dom/` - DOM 平台实现
- `packages/compiler-core/` - 编译器核心实现
- `packages/shared/` - 共享工具函数
- `packages/vue/` - 完整的 Vue 实现

---

## 按角色查找文档

### 初学者

1. 阅读 [README.md](../README.md) 了解项目概况
2. 查看 [EXAMPLES.md](./EXAMPLES.md) 学习基础用法
3. 运行 `packages/vue/example/` 中的示例

### 开发者

1. 阅读 [README.md](../README.md) 了解项目结构
2. 查看 [API.md](./API.md) 了解详细 API
3. 参考 [EXAMPLES.md](./EXAMPLES.md) 学习高级用法
4. 阅读源代码了解实现细节

### 贡献者

1. 阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解贡献流程
2. 设置开发环境
3. 遵循代码规范
4. 提交 Pull Request

### 项目维护者

1. 阅读 [GITHUB_GUIDE.md](./GITHUB_GUIDE.md) 了解仓库管理
2. 设置分支保护
3. 配置 CI/CD
4. 发布版本

---

## 常见问题

### Q: 如何开始使用 guoba-mini-vue？

A: 请查看 [README.md](../README.md) 的安装和使用部分，以及 [EXAMPLES.md](./EXAMPLES.md) 的基础示例。

### Q: API 有哪些？

A: 请查看 [API.md](./API.md) 了解所有可用的 API。

### Q: 如何贡献代码？

A: 请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细的贡献流程。

### Q: 如何将项目上传到 GitHub？

A: 请查看 [GITHUB_GUIDE.md](./GITHUB_GUIDE.md) 了解完整的上传步骤。

### Q: 遇到问题怎么办？

A: 请先查看相关文档，如果找不到答案，可以在 GitHub Issues 中提问。

---

## 文档更新

文档会随着项目的发展不断更新。如果你发现文档有错误或可以改进的地方，欢迎提交 Pull Request。

---

## 联系方式

- GitHub Issues: https://github.com/你的用户名/guoba-mini-vue/issues
- Email: 你的邮箱@example.com

---

## 许可证

所有文档在 MIT License 下发布。详见 [LICENSE](../LICENSE) 文件。

---

感谢你的关注！希望这些文档能帮助你更好地使用和贡献 guoba-mini-vue 项目。🎉
