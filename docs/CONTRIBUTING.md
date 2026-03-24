# 贡献指南

感谢你对 guoba-mini-vue 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 报告 Bug
- 讨论新功能
- 提交代码改进
- 改进文档
- 分享使用经验

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题报告](#问题报告)
- [功能请求](#功能请求)
- [文档贡献](#文档贡献)
- [获取帮助](#获取帮助)

---

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性化的语言或图像
- 人身攻击或政治攻击
- 公开或私下骚扰
- 未经许可发布他人的私人信息
- 其他不道德或不专业的行为

### 责任

项目维护者有责任阐明可接受行为的标准，并对任何不可接受的行为采取适当和公平的纠正措施。

---

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 先在 [Issues](https://github.com/你的用户名/guoba-mini-vue/issues) 中搜索，确认问题是否已被报告
2. 如果没有，创建新的 Issue，包含：
   - 清晰的标题
   - 详细的描述
   - 复现步骤
   - 期望的行为
   - 实际的行为
   - 环境信息（Node.js 版本、操作系统等）
   - 相关的代码片段或日志

### 提出新功能

如果你有新功能的想法：

1. 先在 Issues 中讨论，确保功能符合项目方向
2. 描述功能的用例和预期行为
3. 如果可能，提供实现思路或伪代码
4. 等待维护者反馈后再开始实现

### 提交代码

如果你想贡献代码：

1. Fork 项目仓库
2. 创建功能分支
3. 实现你的功能或修复
4. 编写测试
5. 确保所有测试通过
6. 提交 Pull Request

---

## 开发环境设置

### 1. Fork 仓库

1. 访问 https://github.com/你的用户名/guoba-mini-vue
2. 点击右上角的 "Fork" 按钮
3. 等待 Fork 完成

### 2. 克隆仓库

```bash
# 克隆你 Fork 的仓库
git clone https://github.com/你的用户名/guoba-mini-vue.git
cd guoba-mini-vue

# 添加上游仓库
git remote add upstream https://github.com/原作者用户名/guoba-mini-vue.git

# 验证远程仓库
git remote -v
```

### 3. 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 4. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试 UI
pnpm test:ui

# 生成测试覆盖率
pnpm test:coverage
```

### 5. 构建项目

```bash
# 构建生产版本
pnpm build
```

### 6. 启动开发服务器

```bash
# 如果有开发服务器
pnpm dev
```

---

## 代码规范

### TypeScript 规范

#### 命名约定

- **文件名**：使用 kebab-case（如 `user-profile.ts`）
- **变量名**：使用 camelCase（如 `userName`）
- **常量名**：使用 UPPER_SNAKE_CASE（如 `MAX_COUNT`）
- **类名**：使用 PascalCase（如 `UserProfile`）
- **接口名**：使用 PascalCase，以 `I` 开头（如 `IUserProfile`）
- **类型名**：使用 PascalCase（如 `UserProfile`）

#### 代码格式

```typescript
// ✅ 好的例子
import { reactive } from '@guoba-mini-vue/reactivity'

export function createUser(name: string, age: number) {
  const state = reactive({
    name,
    age
  })

  return state
}

// ❌ 不好的例子
import { reactive } from '@guoba-mini-vue/reactivity';

export function CreateUser(name:string,age:number){
  const state=reactive({name,age});
  return state;
}
```

#### 类型定义

```typescript
// ✅ 好的例子
interface User {
  id: string
  name: string
  age: number
  email?: string
}

function getUser(id: string): User | null {
  // 实现
}

// ❌ 不好的例子
function getUser(id) {
  // 缺少类型定义
}
```

#### 注释规范

```typescript
/**
 * 创建响应式用户对象
 * @param name - 用户名
 * @param age - 年龄
 * @returns 响应式用户对象
 */
export function createUser(name: string, age: number) {
  const state = reactive({
    name,
    age
  })

  return state
}
```

### JavaScript 规范

#### 命名约定

- **文件名**：使用 kebab-case（如 `user-profile.js`）
- **变量名**：使用 camelCase（如 `userName`）
- **常量名**：使用 UPPER_SNAKE_CASE（如 `MAX_COUNT`）
- **类名**：使用 PascalCase（如 `UserProfile`）
- **函数名**：使用 camelCase（如 `getUser`）

#### 代码格式

```javascript
// ✅ 好的例子
import { reactive } from 'guoba-mini-vue'

export function createUser(name, age) {
  const state = reactive({
    name,
    age
  })

  return state
}

// ❌ 不好的例子
import { reactive } from 'guoba-mini-vue';

export function CreateUser(name,age){
  const state=reactive({name,age});
  return state;
}
```

### 测试规范

#### 测试文件命名

- 测试文件应与源文件同名，添加 `.spec.ts` 后缀
- 例如：`reactive.ts` → `reactive.spec.ts`

#### 测试结构

```typescript
import { describe, it, expect } from 'vitest'
import { reactive } from '../src/reactive'

describe('reactive', () => {
  it('should make object reactive', () => {
    const obj = reactive({ count: 0 })
    expect(obj.count).toBe(0)
  })

  it('should track dependencies', () => {
    const obj = reactive({ count: 0 })
    let dummy

    effect(() => {
      dummy = obj.count
    })

    expect(dummy).toBe(0)
    obj.count++
    expect(dummy).toBe(1)
  })
})
```

#### 测试覆盖率

- 新功能必须包含测试
- 测试覆盖率应保持在 80% 以上
- 关键路径必须有 100% 覆盖

---

## 提交规范

### Commit Message 格式

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回滚之前的 commit

### 示例

```bash
# 新功能
git commit -m "feat(reactivity): add shallowReadonly API"

# 修复 Bug
git commit -m "fix(runtime): resolve memory leak in effect cleanup"

# 文档更新
git commit -m "docs(readme): update installation instructions"

# 重构
git commit -m "refactor(renderer): simplify patch logic"

# 性能优化
git commit -m "perf(vdom): optimize diff algorithm for large lists"

# 增加测试
git commit -m "test(reactivity): add edge case tests for computed"

# 代码格式
git commit -m "style: format code with prettier"
```

### Commit Message 最佳实践

- 使用现在时态："add" 而不是 "added" 或 "adds"
- 首字母小写
- 标题不超过 50 个字符
- 标题结尾不加句号
- 主体每行不超过 72 个字符
- 解释"是什么"和"为什么"，而不是"怎么做"

---

## Pull Request 流程

### 1. 创建分支

```bash
# 从 develop 分支创建功能分支
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### 2. 进行开发

```bash
# 进行你的修改
# 编写代码
# 编写测试

# 运行测试
pnpm test

# 格式化代码
pnpm format

# 构建项目
pnpm build
```

### 3. 提交更改

```bash
# 添加文件
git add .

# 提交更改（遵循提交规范）
git commit -m "feat(reactivity): add new feature"

# 推送到你的 Fork
git push origin feature/your-feature-name
```

### 4. 创建 Pull Request

1. 访问你的 Fork 仓库
2. 点击 "Pull requests" 标签
3. 点击 "New pull request"
4. 选择你的功能分支
5. 填写 PR 模板

### 5. PR 模板

```markdown
## 描述
简要描述这个 PR 的目的和内容。

## 相关 Issue
关闭 #(issue 编号)

## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 性能优化
- [ ] 测试更新

## 变更内容
列出主要的变更内容。

## 测试
描述你如何测试这些变更。

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过

## 截图（如果适用）
如果涉及 UI 变更，请提供截图。

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 添加了必要的测试
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 没有引入新的警告
```

### 6. 等待审查

- 维护者会审查你的 PR
- 可能会请求修改
- 及时响应审查意见

### 7. 合并

- 审查通过后，维护者会合并你的 PR
- 你的贡献将成为项目的一部分

---

## 问题报告

### Bug 报告模板

```markdown
## Bug 描述
清晰简洁地描述 Bug。

## 复现步骤
1. 执行 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

## 期望行为
描述你期望发生什么。

## 实际行为
描述实际发生了什么。

## 环境信息
- Node.js 版本：
- 操作系统：
- 浏览器（如果适用）：
- guoba-mini-vue 版本：

## 复现代码
```javascript
// 提供能够复现 Bug 的最小代码示例
```

## 截图
如果适用，添加截图来说明问题。

## 其他信息
提供任何其他有助于解决问题的信息。
```

---

## 功能请求

### 功能请求模板

```markdown
## 功能描述
清晰简洁地描述你想要的功能。

## 问题背景
这个功能解决了什么问题？为什么需要它？

## 期望行为
详细描述你期望的功能如何工作。

## 替代方案
描述你考虑过的其他解决方案或功能。

## 附加信息
添加任何其他有助于理解功能请求的信息、截图或示例。
```

---

## 文档贡献

### 文档改进

如果你发现文档有错误或可以改进：

1. Fork 项目
2. 创建分支
3. 修改文档
4. 提交 PR

### 文档规范

- 使用清晰的标题和子标题
- 提供代码示例
- 添加必要的注释
- 保持简洁明了
- 使用正确的 Markdown 格式

### 示例代码

- 确保示例代码可以运行
- 添加必要的注释
- 展示最佳实践
- 包含错误处理

---

## 获取帮助

### 获取帮助的方式

1. **查看文档**
   - [README.md](../README.md)
   - [API 文档](./API.md)
   - [使用示例](./EXAMPLES.md)

2. **搜索 Issues**
   - 在 [Issues](https://github.com/你的用户名/guoba-mini-vue/issues) 中搜索类似问题

3. **创建 Issue**
   - 如果找不到答案，创建新的 Issue
   - 提供详细的信息

4. **加入社区**
   - 参与讨论
   - 帮助他人

### 联系方式

- GitHub Issues: https://github.com/你的用户名/guoba-mini-vue/issues
- Email: 你的邮箱@example.com

---

## 认可贡献者

我们会在项目的 [CONTRIBUTORS.md](../CONTRIBUTORS.md) 文件中列出所有贡献者。

### 如何被添加

- 提交至少一个被合并的 PR
- 你的 GitHub 用户名会被自动添加到贡献者列表

---

## 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](../LICENSE) 下发布。

---

## 再次感谢

感谢你花时间阅读贡献指南，更感谢你对 guoba-mini-vue 项目的贡献！

每一个贡献都很重要，让我们一起让这个项目变得更好！🎉
