# GitHub 上传指南

本指南将帮助你将 guoba-mini-vue 项目上传到 GitHub 平台，包括创建仓库、配置 Git、提交代码、设置分支保护及发布版本等完整步骤。

## 目录

- [准备工作](#准备工作)
- [创建 GitHub 仓库](#创建-github-仓库)
- [配置 Git](#配置-git)
- [提交代码](#提交代码)
- [设置分支保护](#设置分支保护)
- [发布版本](#发布版本)
- [持续集成](#持续集成)
- [常见问题](#常见问题)

---

## 准备工作

### 1. 安装 Git

确保你的系统已安装 Git：

```bash
# 检查 Git 是否已安装
git --version

# 如果未安装，请访问 https://git-scm.com/downloads 下载安装
```

### 2. 创建 GitHub 账号

如果你还没有 GitHub 账号，请访问 https://github.com/signup 创建一个。

### 3. 配置 Git 用户信息

```bash
# 设置用户名
git config --global user.name "你的用户名"

# 设置邮箱
git config --global user.email "你的邮箱@example.com"
```

### 4. 生成 SSH 密钥（推荐）

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "你的邮箱@example.com"

# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加 SSH 私钥
ssh-add ~/.ssh/id_ed25519

# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

然后访问 https://github.com/settings/keys 添加 SSH 公钥。

---

## 创建 GitHub 仓库

### 方法一：通过 GitHub 网页创建

1. 登录 GitHub
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `guoba-mini-vue`
   - **Description**: `A mini Vue 3 implementation`
   - **Public/Private**: 选择 Public（开源项目）
   - **Initialize with**: 不要勾选任何选项
4. 点击 "Create repository"

### 方法二：使用 GitHub CLI

```bash
# 安装 GitHub CLI（如果未安装）
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh

# 登录 GitHub
gh auth login

# 创建仓库
gh repo create guoba-mini-vue --public --description "A mini Vue 3 implementation"
```

---

## 配置 Git

### 1. 初始化本地仓库

```bash
# 进入项目目录
cd /Users/a1-6/WebstormProjects/guoba-mini-vue

# 初始化 Git 仓库（如果还没有）
git init
```

### 2. 创建 .gitignore 文件

如果项目中还没有 `.gitignore` 文件，创建一个：

```bash
# 创建 .gitignore 文件
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
lib/
dist/
*.tsbuildinfo

# Test coverage
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.*.local

# Backup
.backup/
EOF
```

### 3. 添加远程仓库

```bash
# 使用 HTTPS（如果使用 SSH 密钥，建议使用 SSH）
git remote add origin https://github.com/你的用户名/guoba-mini-vue.git

# 或者使用 SSH
git remote add origin git@github.com:你的用户名/guoba-mini-vue.git

# 验证远程仓库
git remote -v
```

---

## 提交代码

### 1. 检查当前状态

```bash
# 查看文件状态
git status

# 查看未跟踪的文件
git ls-files --others --exclude-standard
```

### 2. 添加文件到暂存区

```bash
# 添加所有文件
git add .

# 或者逐个添加文件
git add README.md
git add package.json
git add packages/
```

### 3. 提交更改

```bash
# 创建初始提交
git commit -m "Initial commit: Add guoba-mini-vue implementation

- Implement reactive system
- Implement virtual DOM
- Implement component system
- Implement compiler core
- Add comprehensive documentation
- Add test coverage"
```

### 4. 推送到 GitHub

```bash
# 推送到 main 分支
git push -u origin main

# 如果遇到错误，可能需要先拉取
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 5. 创建开发分支

```bash
# 创建并切换到 develop 分支
git checkout -b develop

# 推送 develop 分支
git push -u origin develop
```

---

## 设置分支保护

### 1. 进入分支保护设置

1. 访问你的 GitHub 仓库
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Branches"
4. 点击 "Add branch protection rule"

### 2. 配置 main 分支保护

填写以下配置：

- **Branch name pattern**: `main`
- **Require pull request reviews before merging**
  - ✅ 勾选
  - **Required approving reviews**: 1
- **Require status checks to pass before merging**
  - ✅ 勾选
  - **Require branches to be up to date before merging**: ✅ 勾选
- **Require conversation resolution before merging**: ✅ 勾选
- **Do not allow bypassing the above settings**: ✅ 勾选

点击 "Create" 或 "Save changes" 保存设置。

### 3. 配置 develop 分支保护

重复上述步骤，为 `develop` 分支创建保护规则。

---

## 发布版本

### 1. 创建标签

```bash
# 创建带注释的标签
git tag -a v1.0.0 -m "Release version 1.0.0

Features:
- Complete reactive system implementation
- Full virtual DOM support
- Component system with lifecycle
- Compiler core functionality
- Comprehensive API documentation
- Example applications"

# 推送标签到 GitHub
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

### 2. 在 GitHub 上创建 Release

1. 访问你的 GitHub 仓库
2. 点击 "Releases" 标签
3. 点击 "Draft a new release"
4. 填写发布信息：
   - **Choose a tag**: 选择 `v1.0.0`
   - **Release title**: `v1.0.0 - Initial Release`
   - **Describe this release**:
     ```markdown
     ## 🎉 Initial Release

     This is the first stable release of guoba-mini-vue.

     ### ✨ Features

     - **Reactive System**: Complete implementation of reactive, ref, computed, effect
     - **Virtual DOM**: Full virtual DOM with diff algorithm
     - **Component System**: Component lifecycle, props, slots, and provide/inject
     - **Compiler**: Template compilation, AST transformation, and code generation
     - **TypeScript**: Full type definitions and type safety

     ### 📚 Documentation

     - Comprehensive API documentation
     - Detailed usage examples
     - Contributing guidelines
     - GitHub upload guide

     ### 🧪 Testing

     - 37 test cases with 100% pass rate
     - Test coverage for all core features
     - Snapshot testing for compiler

     ### 📦 Installation

     ```bash
     npm install guoba-mini-vue
     ```

     ### 🚀 Quick Start

     ```javascript
     import { createApp, h, reactive } from 'guoba-mini-vue'

     const App = {
       setup() {
         const state = reactive({ count: 0 })
         return { state }
       },
       render() {
         return h('div', `Count: ${this.state.count}`)
       }
     }

     createApp(App).mount('#app')
     ```

     ### 📝 License

     MIT License - see [LICENSE](LICENSE) file for details
     ```
5. 点击 "Publish release"

---

## 持续集成

### 1. 创建 GitHub Actions 工作流

创建 `.github/workflows/ci.yml` 文件：

```bash
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install

    - name: Run tests
      run: pnpm test

    - name: Build
      run: pnpm build

  lint:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install

    - name: Format check
      run: pnpm format --check
EOF
```

### 2. 提交 CI 配置

```bash
git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions CI workflow"
git push origin main
```

### 3. 创建发布工作流

创建 `.github/workflows/release.yml` 文件：

```bash
cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
        registry-url: 'https://registry.npmjs.org'

    - name: Install dependencies
      run: pnpm install

    - name: Build
      run: pnpm build

    - name: Publish to npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
EOF
```

---

## 项目配置

### 1. 更新 package.json

确保 `package.json` 包含正确的发布配置：

```json
{
  "name": "guoba-mini-vue",
  "version": "1.0.0",
  "description": "A mini Vue 3 implementation",
  "main": "lib/guoba-mini-vue.cjs.js",
  "module": "lib/guoba-mini-vue.esm.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib",
    "README.md",
    "LICENSE"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/你的用户名/guoba-mini-vue.git"
  },
  "keywords": [
    "vue",
    "vue3",
    "reactive",
    "virtual-dom",
    "component"
  ],
  "author": "你的名字",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/你的用户名/guoba-mini-vue/issues"
  },
  "homepage": "https://github.com/你的用户名/guoba-mini-vue#readme"
}
```

### 2. 创建 LICENSE 文件

创建 MIT License 文件：

```bash
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 你的名字

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

---

## 验证上传

### 1. 检查仓库

访问你的 GitHub 仓库，确认：

- ✅ 所有文件都已上传
- ✅ README.md 显示正确
- ✅ 分支保护已设置
- ✅ CI/CD 工作流正在运行
- ✅ Release 已创建

### 2. 测试克隆

```bash
# 在另一个目录测试克隆
cd /tmp
git clone https://github.com/你的用户名/guoba-mini-vue.git
cd guoba-mini-vue
pnpm install
pnpm test
pnpm build
```

---

## 日常开发流程

### 1. 创建功能分支

```bash
# 从 develop 分支创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. 提交更改

```bash
# 添加文件
git add .

# 提交更改
git commit -m "Add your feature description"

# 推送到远程
git push origin feature/your-feature-name
```

### 3. 创建 Pull Request

1. 访问 GitHub 仓库
2. 点击 "Pull requests" 标签
3. 点击 "New pull request"
4. 选择你的功能分支
5. 填写 PR 描述
6. 创建 PR

### 4. 合并 PR

1. 等待 CI 检查通过
2. 请求代码审查
3. 审查通过后合并到 develop

### 5. 发布到 main

```bash
# 从 develop 合并到 main
git checkout main
git pull origin main
git merge develop
git push origin main

# 创建发布标签
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1
```

---

## 常见问题

### 1. 推送时出现权限错误

**问题**：
```
ERROR: Permission to 用户名/guoba-mini-vue.git denied to 用户名
```

**解决**：
- 检查 SSH 密钥是否正确添加
- 确认你有仓库的写入权限
- 尝试使用 HTTPS 而不是 SSH

### 2. .gitignore 不生效

**问题**：已经添加到 .gitignore 的文件仍然被跟踪

**解决**：
```bash
# 清除 Git 缓存
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

### 3. 分支保护阻止推送

**问题**：无法直接推送到 main 分支

**解决**：
- 这是正常的，分支保护要求通过 PR 合并
- 创建 PR 并通过审查后合并

### 4. CI 检查失败

**问题**：GitHub Actions 检查失败

**解决**：
- 查看失败的日志
- 在本地运行相同的命令排查问题
- 修复问题后推送新的提交

### 5. 标签推送失败

**问题**：无法推送标签到 GitHub

**解决**：
```bash
# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin :refs/tags/v1.0.0

# 重新创建并推送
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## 下一步

完成以上步骤后，你的项目已经成功上传到 GitHub。接下来可以：

1. **设置项目描述和主题**：在仓库设置中添加项目描述和主题
2. **添加徽章**：在 README.md 中添加构建状态、版本等徽章
3. **设置 Issue 模板**：创建 Issue 模板规范问题报告
4. **设置 PR 模板**：创建 PR 模板规范贡献流程
5. **配置 GitHub Pages**：部署文档网站
6. **设置自动化工具**：配置 Dependabot 等自动化工具

---

## 参考资源

- [GitHub 官方文档](https://docs.github.com/)
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [语义化版本](https://semver.org/lang/zh-CN/)
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 贡献指南

---

## 支持

如果遇到问题，请：

1. 查看 GitHub 官方文档
2. 在项目 Issues 中提问
3. 联系项目维护者

祝你开源顺利！🎉
