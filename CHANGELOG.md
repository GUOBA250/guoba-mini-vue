# 更新日志

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2025-03-24

### 新增

#### 响应式系统
- 实现 `reactive` API，创建响应式对象
- 实现 `ref` API，创建响应式引用
- 实现 `computed` API，创建计算属性
- 实现 `effect` API，注册副作用函数
- 实现 `readonly` API，创建只读对象
- 实现 `shallowReadonly` API，创建浅层只读对象
- 实现 `isReactive`、`isReadonly`、`isProxy` 类型检查函数
- 实现 `isRef`、`unRef`、`proxyRefs` ref 工具函数
- 实现 `stop` 函数，停止副作用

#### 虚拟 DOM
- 实现虚拟节点创建和更新
- 实现完整的 diff 算法
- 实现子节点更新优化
- 实现 `h` 函数，创建虚拟节点
- 实现文本节点处理

#### 组件系统
- 实现组件实例化
- 实现组件生命周期
- 实现 props 传递和更新
- 实现 slots 插槽系统
- 实现 provide/inject 依赖注入
- 实现组件更新机制

#### 编译器
- 实现模板解析器
- 实现 AST 转换
- 实现代码生成器
- 实现插件系统
- 实现各种转换插件（元素、表达式、文本）

#### 运行时
- 实现 `createApp` API
- 实现 `nextTick` API
- 实现调度器
- 实现渲染器

#### 工具函数
- 实现 `toDisplayString` 工具函数
- 实现各种类型检查工具

#### 测试
- 添加 37 个测试用例
- 实现响应式系统测试
- 实现编译器测试（包含快照测试）
- 实现运行时测试
- 测试覆盖率达到 100%

#### 文档
- 创建完整的 README.md
- 创建详细的 API 文档
- 创建丰富的使用示例
- 创建贡献指南
- 创建 GitHub 上传指南
- 创建文档索引

#### 构建工具
- 配置 Rollup 打包工具
- 配置 TypeScript 编译
- 配置 Vitest 测试框架
- 配置 Prettier 代码格式化
- 配置 pnpm monorepo

#### 架构优化
- 重构 runtime-core，移除重复的 DOM 操作代码
- 实现清晰的关注点分离
- 优化依赖树和模块导入
- 改进代码组织和模块内聚性

### 修复

- 修复构建配置问题
- 修复 TypeScript 类型错误
- 修复测试文件类型定义问题
- 修复依赖管理问题

### 性能

- 优化 diff 算法性能
- 优化响应式系统性能
- 优化构建产物大小

### 文档

- 添加完整的 API 文档
- 添加详细的使用示例
- 添加贡献指南
- 添加 GitHub 上传指南

---

## [Unreleased]

### 计划中

- 添加更多编译器插件
- 实现更多 Vue 3 特性
- 添加性能监控工具
- 改进错误处理
- 添加开发工具支持

---

## 版本说明

### 版本号格式

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 更新类型

- **新增**：新功能
- **变更**：现有功能的变更
- **弃用**：即将移除的功能
- **移除**：已移除的功能
- **修复**：Bug 修复
- **安全**：安全相关的修复

---

## 贡献者

感谢所有贡献者！详见 [CONTRIBUTORS.md](./CONTRIBUTORS.md)

---

## 链接

- [GitHub Releases](https://github.com/你的用户名/guoba-mini-vue/releases)
- [GitHub Issues](https://github.com/你的用户名/guoba-mini-vue/issues)
- [Pull Requests](https://github.com/你的用户名/guoba-mini-vue/pulls)
