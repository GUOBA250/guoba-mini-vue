# 使用示例

本文档提供了 guoba-mini-vue 的详细使用示例，涵盖所有核心功能。

## 目录

- [基础示例](#基础示例)
  - [计数器](#计数器)
  - [响应式对象](#响应式对象)
  - [计算属性](#计算属性)
- [响应式系统](#响应式系统)
  - [reactive 使用](#reactive-使用)
  - [ref 使用](#ref-使用)
  - [computed 使用](#computed-使用)
  - [effect 使用](#effect-使用)
  - [readonly 使用](#readonly-使用)
- [组件系统](#组件系统)
  - [基础组件](#基础组件)
  - [组件通信](#组件通信)
  - [provide/inject](#provideinject)
  - [组件更新](#组件更新)
- [虚拟 DOM](#虚拟-dom)
  - [创建虚拟节点](#创建虚拟节点)
  - [子节点更新](#子节点更新)
  - [nextTick 使用](#nexttick-使用)
- [编译器](#编译器)
  - [基础编译](#基础编译)
  - [模板转换](#模板转换)

---

## 基础示例

### 计数器

最简单的计数器示例，展示响应式更新。

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>计数器示例</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
</body>
</html>
```

#### JavaScript

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

    const decrement = () => {
      state.count--
    }

    return {
      state,
      increment,
      decrement
    }
  },

  render() {
    return h('div', { class: 'counter' }, [
      h('h2', '计数器'),
      h('p', `当前值: ${this.state.count}`),
      h('button', { onClick: this.increment }, '+'),
      h('button', { onClick: this.decrement }, '-')
    ])
  }
}

createApp(App).mount('#app')
```

#### 运行步骤

1. 创建 HTML 文件
2. 创建 JavaScript 文件
3. 在浏览器中打开 HTML 文件
4. 点击按钮查看计数变化

---

### 响应式对象

展示如何使用 reactive 创建响应式对象。

#### 示例代码

```javascript
import { reactive } from 'guoba-mini-vue'

const App = {
  setup() {
    const user = reactive({
      name: '张三',
      age: 25,
      address: {
        city: '北京',
        country: '中国'
      }
    })

    const updateName = () => {
      user.name = '李四'
    }

    const updateAge = () => {
      user.age++
    }

    const updateCity = () => {
      user.address.city = '上海'
    }

    return {
      user,
      updateName,
      updateAge,
      updateCity
    }
  },

  render() {
    return h('div', { class: 'user-info' }, [
      h('h2', '用户信息'),
      h('p', `姓名: ${this.user.name}`),
      h('p', `年龄: ${this.user.age}`),
      h('p', `城市: ${this.user.address.city}`),
      h('button', { onClick: this.updateName }, '修改姓名'),
      h('button', { onClick: this.updateAge }, '增加年龄'),
      h('button', { onClick: this.updateCity }, '修改城市')
    ])
  }
}

createApp(App).mount('#app')
```

#### 说明

- reactive 会递归地将对象转换为响应式
- 嵌套对象也会自动转换为响应式
- 任何属性的修改都会触发更新

---

### 计算属性

展示 computed 的使用。

#### 示例代码

```javascript
import { reactive, computed } from 'guoba-mini-vue'

const App = {
  setup() {
    const state = reactive({
      firstName: '张',
      lastName: '三',
      age: 25
    })

    const fullName = computed(() => {
      return `${state.firstName}${state.lastName}`
    })

    const isAdult = computed(() => {
      return state.age >= 18
    })

    const updateFirstName = () => {
      state.firstName = '李'
    }

    const updateAge = () => {
      state.age = 17
    }

    return {
      state,
      fullName,
      isAdult,
      updateFirstName,
      updateAge
    }
  },

  render() {
    return h('div', { class: 'computed-demo' }, [
      h('h2', '计算属性示例'),
      h('p', `姓名: ${this.fullName.value}`),
      h('p', `年龄: ${this.state.age}`),
      h('p', `是否成年: ${this.isAdult.value ? '是' : '否'}`),
      h('button', { onClick: this.updateFirstName }, '修改姓氏'),
      h('button', { onClick: this.updateAge }, '修改年龄')
    ])
  }
}

createApp(App).mount('#app')
```

#### 说明

- computed 会自动缓存结果
- 只有依赖变化时才重新计算
- 需要通过 `.value` 访问计算属性的值

---

## 响应式系统

### reactive 使用

展示 reactive 的各种用法。

#### 示例 1: 基本用法

```javascript
import { reactive } from 'guoba-mini-vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++
state.message = 'World'
```

#### 示例 2: 数组响应式

```javascript
import { reactive } from 'guoba-mini-vue'

const list = reactive([1, 2, 3])

list.push(4)
list.pop()
list[0] = 10
```

#### 示例 3: Map 和 Set

```javascript
import { reactive } from 'guoba-mini-vue'

const map = reactive(new Map())
map.set('key', 'value')

const set = reactive(new Set())
set.add(1)
set.add(2)
```

---

### ref 使用

展示 ref 的各种用法。

#### 示例 1: 基本用法

```javascript
import { ref } from 'guoba-mini-vue'

const count = ref(0)
const message = ref('Hello')

console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

#### 示例 2: ref 包装对象

```javascript
import { ref } from 'guoba-mini-vue'

const user = ref({
  name: '张三',
  age: 25
})

console.log(user.value.name) // 张三
user.value.age++
```

#### 示例 3: 在组件中使用

```javascript
import { ref } from 'guoba-mini-vue'

const App = {
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return {
      count,
      increment
    }
  },

  render() {
    return h('div', [
      h('p', `Count: ${this.count.value}`),
      h('button', { onClick: this.increment }, 'Increment')
    ])
  }
}
```

---

### computed 使用

展示 computed 的高级用法。

#### 示例 1: 链式计算

```javascript
import { ref, computed } from 'guoba-mini-vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const quadrupled = computed(() => doubled.value * 2)

console.log(quadrupled.value) // 0
count.value++
console.log(quadrupled.value) // 4
```

#### 示例 2: 多依赖计算

```javascript
import { reactive, computed } from 'guoba-mini-vue'

const state = reactive({
  firstName: '张',
  lastName: '三',
  title: '先生'
})

const fullName = computed(() => {
  return `${state.title} ${state.firstName}${state.lastName}`
})
```

---

### effect 使用

展示 effect 的各种用法。

#### 示例 1: 基本用法

```javascript
import { reactive, effect } from 'guoba-mini-vue'

const state = reactive({
  count: 0
})

effect(() => {
  console.log(`Count changed: ${state.count}`)
})

state.count++ // 输出: Count changed: 1
```

#### 示例 2: 嵌套 effect

```javascript
import { reactive, effect } from 'guoba-mini-vue'

const state = reactive({
  count: 0
})

effect(() => {
  console.log(`Outer effect: ${state.count}`)

  effect(() => {
    console.log(`Inner effect: ${state.count}`)
  })
})

state.count++
// 输出:
// Outer effect: 1
// Inner effect: 1
```

#### 示例 3: 停止 effect

```javascript
import { reactive, effect, stop } from 'guoba-mini-vue'

const state = reactive({
  count: 0
})

const runner = effect(() => {
  console.log(`Count: ${state.count}`)
})

stop(runner)

state.count++ // 不会输出
```

---

### readonly 使用

展示 readonly 的使用。

#### 示例 1: 基本用法

```javascript
import { reactive, readonly } from 'guoba-mini-vue'

const original = reactive({
  count: 0
})

const copy = readonly(original)

copy.count++ // 警告：不能修改只读对象
```

#### 示例 2: 嵌套只读

```javascript
import { reactive, readonly } from 'guoba-mini-vue'

const state = reactive({
  user: {
    name: '张三',
    age: 25
  }
})

const copy = readonly(state)

copy.user.age++ // 警告：不能修改只读对象
```

---

## 组件系统

### 基础组件

展示如何创建和使用组件。

#### 示例代码

```javascript
import { createApp, h } from 'guoba-mini-vue'

// 子组件
const Button = {
  props: ['text', 'onClick'],
  render() {
    return h('button', { onClick: this.onClick }, this.text)
  }
}

// 父组件
const App = {
  setup() {
    const handleClick = () => {
      console.log('Button clicked!')
    }

    return {
      handleClick
    }
  },

  render() {
    return h('div', [
      h('h2', '基础组件示例'),
      h(Button, {
        text: '点击我',
        onClick: this.handleClick
      })
    ])
  }
}

createApp(App).mount('#app')
```

---

### 组件通信

展示父子组件通信。

#### 示例代码

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

// 子组件
const Child = {
  props: ['message', 'count'],
  emits: ['update'],
  setup(props, { emit }) {
    const increment = () => {
      emit('update', props.count + 1)
    }

    return {
      increment
    }
  },

  render() {
    return h('div', { class: 'child' }, [
      h('p', `Message: ${this.message}`),
      h('p', `Count: ${this.count}`),
      h('button', { onClick: this.increment }, 'Increment')
    ])
  }
}

// 父组件
const Parent = {
  setup() {
    const state = reactive({
      message: 'Hello from Parent',
      count: 0
    })

    const handleUpdate = (newCount) => {
      state.count = newCount
    }

    return {
      state,
      handleUpdate
    }
  },

  render() {
    return h('div', { class: 'parent' }, [
      h('h2', '组件通信示例'),
      h(Child, {
        message: this.state.message,
        count: this.state.count,
        onUpdate: this.handleUpdate
      })
    ])
  }
}

createApp(Parent).mount('#app')
```

---

### provide/inject

展示依赖注入的使用。

#### 示例代码

```javascript
import { createApp, h, provide, inject } from 'guoba-mini-vue'

// 祖先组件
const Provider = {
  setup() {
    provide('theme', 'dark')
    provide('user', {
      name: '张三',
      age: 25
    })

    return {}
  },

  render() {
    return h('div', { class: 'provider' }, [
      h('h3', 'Provider'),
      h(Consumer)
    ])
  }
}

// 后代组件
const Consumer = {
  setup() {
    const theme = inject('theme', 'light')
    const user = inject('user', { name: 'Guest' })
    const config = inject('config', { debug: false })

    return {
      theme,
      user,
      config
    }
  },

  render() {
    return h('div', { class: 'consumer' }, [
      h('h3', 'Consumer'),
      h('p', `Theme: ${this.theme}`),
      h('p', `User: ${this.user.name}`),
      h('p', `Debug: ${this.config.debug}`)
    ])
  }
}

// 根组件
const App = {
  render() {
    return h('div', { class: 'app' }, [
      h('h2', 'Provide/Inject 示例'),
      h(Provider)
    ])
  }
}

createApp(App).mount('#app')
```

---

### 组件更新

展示组件更新的机制。

#### 示例代码

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

// 子组件
const Child = {
  props: ['value'],
  render() {
    return h('div', { class: 'child' }, [
      h('p', `Child value: ${this.value}`)
    ])
  }
}

// 父组件
const Parent = {
  setup() {
    const state = reactive({
      count: 0,
      message: 'Hello'
    })

    const updateCount = () => {
      state.count++
    }

    const updateMessage = () => {
      state.message = 'World'
    }

    return {
      state,
      updateCount,
      updateMessage
    }
  },

  render() {
    return h('div', { class: 'parent' }, [
      h('h2', '组件更新示例'),
      h('p', `Count: ${this.state.count}`),
      h('p', `Message: ${this.state.message}`),
      h(Child, { value: this.state.count }),
      h('button', { onClick: this.updateCount }, 'Update Count'),
      h('button', { onClick: this.updateMessage }, 'Update Message')
    ])
  }
}

createApp(Parent).mount('#app')
```

---

## 虚拟 DOM

### 创建虚拟节点

展示如何创建各种虚拟节点。

#### 示例 1: 基本元素

```javascript
import { h } from 'guoba-mini-vue'

// 创建 div
const div = h('div', { class: 'container' }, 'Hello')

// 创建 span
const span = h('span', { style: 'color: red' }, 'Text')

// 创建带子元素的元素
const ul = h('ul', [
  h('li', 'Item 1'),
  h('li', 'Item 2'),
  h('li', 'Item 3')
])
```

#### 示例 2: 带属性的元素

```javascript
import { h } from 'guoba-mini-vue'

const button = h('button', {
  class: 'btn btn-primary',
  id: 'submit-btn',
  type: 'button',
  onClick: () => console.log('Clicked!')
}, 'Submit')

const input = h('input', {
  type: 'text',
  placeholder: 'Enter text',
  value: 'Default value',
  onInput: (e) => console.log(e.target.value)
})
```

#### 示例 3: 事件处理

```javascript
import { h } from 'guoba-mini-vue'

const button = h('button', {
  onClick: () => console.log('Click'),
  onMouseEnter: () => console.log('Enter'),
  onMouseLeave: () => console.log('Leave')
}, 'Hover me')
```

---

### 子节点更新

展示子节点的各种更新场景。

#### 示例 1: 数组到数组

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

const App = {
  setup() {
    const items = reactive([1, 2, 3])

    const addItem = () => {
      items.push(items.length + 1)
    }

    const removeItem = () => {
      items.pop()
    }

    return {
      items,
      addItem,
      removeItem
    }
  },

  render() {
    return h('div', [
      h('h2', '数组到数组'),
      h('ul', this.items.map(item => h('li', item))),
      h('button', { onClick: this.addItem }, 'Add'),
      h('button', { onClick: this.removeItem }, 'Remove')
    ])
  }
}

createApp(App).mount('#app')
```

#### 示例 2: 文本到数组

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

const App = {
  setup() {
    const content = reactive('Hello')

    const toArray = () => {
      content.value = ['Hello', 'World']
    }

    const toText = () => {
      content.value = 'Hello'
    }

    return {
      content,
      toArray,
      toText
    }
  },

  render() {
    return h('div', [
      h('h2', '文本到数组'),
      h('div', this.content),
      h('button', { onClick: this.toArray }, 'To Array'),
      h('button', { onClick: this.toText }, 'To Text')
    ])
  }
}

createApp(App).mount('#app')
```

#### 示例 3: 文本到文本

```javascript
import { createApp, h, reactive } from 'guoba-mini-vue'

const App = {
  setup() {
    const text = reactive('Hello')

    const updateText = () => {
      text.value = 'World'
    }

    return {
      text,
      updateText
    }
  },

  render() {
    return h('div', [
      h('h2', '文本到文本'),
      h('p', this.text),
      h('button', { onClick: this.updateText }, 'Update Text')
    ])
  }
}

createApp(App).mount('#app')
```

---

### nextTick 使用

展示 nextTick 的使用场景。

#### 示例代码

```javascript
import { createApp, h, reactive, nextTick } from 'guoba-mini-vue'

const App = {
  setup() {
    const state = reactive({
      count: 0
    })

    const updateAndLog = async () => {
      state.count++
      console.log('Before nextTick:', document.querySelector('p').textContent)

      await nextTick()
      console.log('After nextTick:', document.querySelector('p').textContent)
    }

    return {
      state,
      updateAndLog
    }
  },

  render() {
    return h('div', [
      h('h2', 'nextTick 示例'),
      h('p', `Count: ${this.state.count}`),
      h('button', { onClick: this.updateAndLog }, 'Update and Log')
    ])
  }
}

createApp(App).mount('#app')
```

#### 说明

- nextTick 会在 DOM 更新完成后执行回调
- 适合在数据更新后立即操作 DOM
- 可以使用 Promise 或回调函数

---

## 编译器

### 基础编译

展示模板编译的基本用法。

#### 示例代码

```javascript
import { createApp } from 'guoba-mini-vue'

const App = {
  template: `
    <div>
      <h2>模板编译示例</h2>
      <p>{{ message }}</p>
      <button @click="updateMessage">更新消息</button>
    </div>
  `,
  setup() {
    const message = 'Hello World'

    const updateMessage = () => {
      message.value = 'Updated!'
    }

    return {
      message,
      updateMessage
    }
  }
}

createApp(App).mount('#app')
```

---

### 模板转换

展示模板的各种转换。

#### 示例 1: 插值

```javascript
const template = `
  <div>
    <p>{{ message }}</p>
    <p>{{ count }}</p>
  </div>
`
```

#### 示例 2: 指令

```javascript
const template = `
  <div>
    <p v-if="show">Conditional rendering</p>
    <ul>
      <li v-for="item in items">{{ item }}</li>
    </ul>
    <button @click="handleClick">Click me</button>
  </div>
`
```

#### 示例 3: 组件

```javascript
const template = `
  <div>
    <MyComponent :message="msg" @update="handleUpdate" />
  </div>
`
```

---

## 完整示例项目

### Todo List

一个完整的待办事项应用。

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .todo-item.completed span {
            text-decoration: line-through;
            color: #999;
        }
        button {
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
import { createApp, h, reactive, computed } from 'guoba-mini-vue'

const TodoItem = {
  props: ['todo', 'index'],
  emits: ['toggle', 'remove'],
  setup(props, { emit }) {
    const toggle = () => {
      emit('toggle', props.index)
    }

    const remove = () => {
      emit('remove', props.index)
    }

    return {
      toggle,
      remove
    }
  },

  render() {
    return h('div', {
      class: `todo-item ${this.todo.completed ? 'completed' : ''}`
    }, [
      h('input', {
        type: 'checkbox',
        checked: this.todo.completed,
        onChange: this.toggle
      }),
      h('span', this.todo.text),
      h('button', { onClick: this.remove }, '删除')
    ])
  }
}

const App = {
  setup() {
    const state = reactive({
      newTodo: '',
      todos: [
        { text: '学习 Vue 3', completed: false },
        { text: '完成项目', completed: false },
        { text: '写文档', completed: true }
      ]
    })

    const addTodo = () => {
      if (state.newTodo.trim()) {
        state.todos.push({
          text: state.newTodo,
          completed: false
        })
        state.newTodo = ''
      }
    }

    const toggleTodo = (index) => {
      state.todos[index].completed = !state.todos[index].completed
    }

    const removeTodo = (index) => {
      state.todos.splice(index, 1)
    }

    const completedCount = computed(() => {
      return state.todos.filter(todo => todo.completed).length
    })

    const totalCount = computed(() => {
      return state.todos.length
    })

    return {
      state,
      addTodo,
      toggleTodo,
      removeTodo,
      completedCount,
      totalCount
    }
  },

  render() {
    return h('div', { class: 'todo-app' }, [
      h('h1', 'Todo List'),
      h('div', { class: 'input-group' }, [
        h('input', {
          type: 'text',
          placeholder: '添加新任务',
          value: this.state.newTodo,
          onInput: (e) => {
            this.state.newTodo = e.target.value
          }
        }),
        h('button', { onClick: this.addTodo }, '添加')
      ]),
      h('div', { class: 'todo-list' }, this.state.todos.map((todo, index) => {
        return h(TodoItem, {
          todo,
          index,
          onToggle: this.toggleTodo,
          onRemove: this.removeTodo
        })
      })),
      h('p', `已完成: ${this.completedCount.value} / ${this.totalCount.value}`)
    ])
  }
}

createApp(App).mount('#app')
```

---

## 更多示例

项目包含更多示例，位于 `packages/vue/example/` 目录：

- `apilnject/` - provide/inject API 示例
- `compiler-base/` - 编译器基础示例
- `componenUpdate/` - 组件更新示例
- `nextTicker/` - nextTick 示例
- `patchChildren/` - 子节点更新示例
- `update/` - 响应式更新示例

每个示例都包含完整的 HTML、JavaScript 和使用说明，可以直接在浏览器中运行。

---

## 常见问题

### 1. 如何调试响应式更新？

使用 effect 来追踪依赖变化：

```javascript
import { reactive, effect } from 'guoba-mini-vue'

const state = reactive({ count: 0 })

effect(() => {
  console.log('State changed:', state.count)
})
```

### 2. 如何优化性能？

- 使用 computed 缓存计算结果
- 合理使用 shallowReadonly 避免深层响应式
- 及时停止不需要的 effect

### 3. 如何处理异步操作？

使用 async/await 配合 nextTick：

```javascript
import { nextTick } from 'guoba-mini-vue'

const updateData = async () => {
  // 更新数据
  state.value = newData

  // 等待 DOM 更新
  await nextTick()

  // 操作 DOM
  document.querySelector('.element').scrollIntoView()
}
```

---

## 更多信息

- 查看 [API 文档](./API.md) 了解详细的 API 说明
- 查看 [README.md](../README.md) 了解项目概况
- 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何贡献代码
