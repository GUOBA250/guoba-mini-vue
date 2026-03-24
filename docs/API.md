# API 文档

## 目录

- [响应式 API](#响应式-api)
  - [reactive](#reactive)
  - [ref](#ref)
  - [computed](#computed)
  - [effect](#effect)
  - [readonly](#readonly)
  - [shallowReadonly](#shallowreadonly)
  - [isReactive](#isreactive)
  - [isReadonly](#isreadonly)
  - [isProxy](#isproxy)
  - [isRef](#isref)
  - [unRef](#unref)
  - [proxyRefs](#proxyrefs)
  - [stop](#stop)
- [运行时 API](#运行时-api)
  - [createApp](#createapp)
  - [h](#h)
  - [nextTick](#nexttick)
  - [provide](#provide)
  - [inject](#inject)
  - [getCurrentInstance](#getcurrentinstance)
  - [setCurrentInstance](#setcurrentinstance)
  - [registerRuntimeCompiler](#registerruntimecompiler)
- [虚拟节点 API](#虚拟节点-api)
  - [createTextVnode](#createtextvnode)
  - [createElementVNode](#createelementvnode)
  - [renderSlots](#renderslots)
  - [toDisplayString](#todisplaystring)

## 响应式 API

### reactive

创建一个响应式对象。

#### 参数

- `target: object` - 要转换为响应式的对象

#### 返回值

- `object` - 响应式对象的 Proxy

#### 示例

```javascript
import { reactive } from 'guoba-mini-vue'

const state = reactive({
  count: 0,
  name: 'guoba'
})

state.count++ // 会触发响应式更新
```

#### 注意事项

- 只能用于对象类型（Object、Array、Map、Set）
- 不能解构响应式对象，否则会失去响应性
- 嵌套对象也会被转换为响应式

---

### ref

创建一个响应式引用，可以包装任何类型的值。

#### 参数

- `value: T` - 要包装的值

#### 返回值

- `Ref<T>` - 包含 `value` 属性的响应式对象

#### 示例

```javascript
import { ref } from 'guoba-mini-vue'

const count = ref(0)
const message = ref('hello')

console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

#### 注意事项

- 需要通过 `.value` 访问和修改值
- 在模板中会自动解包
- 可以包装基本类型和对象类型

---

### computed

创建一个计算属性 ref。

#### 参数

- `getter: () => T` - getter 函数

#### 返回值

- `ComputedRef<T>` - 只读的计算属性 ref

#### 示例

```javascript
import { ref, computed } from 'guoba-mini-vue'

const count = ref(1)
const doubled = computed(() => count.value * 2)

console.log(doubled.value) // 2
count.value++
console.log(doubled.value) // 4
```

#### 注意事项

- 计算属性会自动缓存，只有依赖变化时才重新计算
- 默认是只读的

---

### effect

注册一个副作用函数，在依赖变化时自动执行。

#### 参数

- `fn: () => void` - 副作用函数
- `options?: object` - 配置选项
  - `scheduler?: () => void` - 调度函数

#### 返回值

- `() => void` - 停止函数，调用可停止副作用

#### 示例

```javascript
import { reactive, effect } from 'guoba-mini-vue'

const state = reactive({ count: 0 })

effect(() => {
  console.log(`Count is: ${state.count}`)
})

state.count++ // 输出: Count is: 1
```

#### 注意事项

- 副作用函数会立即执行一次
- 会自动追踪依赖
- 可以通过返回的函数停止追踪

---

### readonly

创建一个只读的响应式对象。

#### 参数

- `target: object` - 要转换为只读的对象

#### 返回值

- `object` - 只读的响应式对象

#### 示例

```javascript
import { reactive, readonly } from 'guoba-mini-vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

copy.count++ // 警告：不能修改只读对象
```

#### 注意事项

- 任何修改操作都会被拦截并发出警告
- 嵌套对象也会是只读的

---

### shallowReadonly

创建一个浅层只读的响应式对象。

#### 参数

- `target: object` - 要转换为浅层只读的对象

#### 返回值

- `object` - 浅层只读的响应式对象

#### 示例

```javascript
import { reactive, shallowReadonly } from 'guoba-mini-vue'

const state = reactive({
  nested: { count: 0 }
})

const copy = shallowReadonly(state)

copy.nested.count++ // 可以修改嵌套对象
copy.count = 1 // 不能修改顶层属性
```

#### 注意事项

- 只有顶层属性是只读的
- 嵌套对象保持原有响应性

---

### isReactive

检查一个对象是否是由 `reactive` 创建的响应式对象。

#### 参数

- `value: any` - 要检查的值

#### 返回值

- `boolean` - 是否是响应式对象

#### 示例

```javascript
import { reactive, isReactive } from 'guoba-mini-vue'

const state = reactive({ count: 0 })
console.log(isReactive(state)) // true
console.log(isReactive({ count: 0 })) // false
```

---

### isReadonly

检查一个对象是否是由 `readonly` 或 `shallowReadonly` 创建的只读对象。

#### 参数

- `value: any` - 要检查的值

#### 返回值

- `boolean` - 是否是只读对象

#### 示例

```javascript
import { reactive, readonly, isReadonly } from 'guoba-mini-vue'

const state = reactive({ count: 0 })
const copy = readonly(state)

console.log(isReadonly(copy)) // true
console.log(isReadonly(state)) // false
```

---

### isProxy

检查一个对象是否是由 `reactive`、`readonly` 或 `shallowReadonly` 创建的代理对象。

#### 参数

- `value: any` - 要检查的值

#### 返回值

- `boolean` - 是否是代理对象

#### 示例

```javascript
import { reactive, readonly, isProxy } from 'guoba-mini-vue'

const state = reactive({ count: 0 })
const copy = readonly(state)

console.log(isProxy(state)) // true
console.log(isProxy(copy)) // true
console.log(isProxy({ count: 0 })) // false
```

---

### isRef

检查一个值是否是 ref 对象。

#### 参数

- `value: any` - 要检查的值

#### 返回值

- `boolean` - 是否是 ref 对象

#### 示例

```javascript
import { ref, isRef } from 'guoba-mini-vue'

const count = ref(0)
console.log(isRef(count)) // true
console.log(isRef(0)) // false
```

---

### unRef

如果参数是 ref，则返回其内部值，否则返回参数本身。

#### 参数

- `value: T | Ref<T>` - 要解包的值

#### 返回值

- `T` - 解包后的值

#### 示例

```javascript
import { ref, unRef } from 'guoba-mini-vue'

const count = ref(0)
console.log(unRef(count)) // 0
console.log(unRef(0)) // 0
```

---

### proxyRefs

代理一个对象，使其中的 ref 属性在访问时自动解包。

#### 参数

- `objectWithRefs: object` - 包含 ref 属性的对象

#### 返回值

- `object` - 代理后的对象

#### 示例

```javascript
import { ref, proxyRefs } from 'guoba-mini-vue'

const state = proxyRefs({
  count: ref(0),
  name: ref('guoba')
})

console.log(state.count) // 0 (不需要 .value)
state.count = 1 // 会自动更新 ref.value
```

---

### stop

停止一个副作用函数的响应式追踪。

#### 参数

- `runner: () => void` - 由 `effect` 返回的停止函数

#### 示例

```javascript
import { reactive, effect, stop } from 'guoba-mini-vue'

const state = reactive({ count: 0 })

const runner = effect(() => {
  console.log(`Count is: ${state.count}`)
})

stop(runner)

state.count++ // 不会触发副作用
```

---

## 运行时 API

### createApp

创建一个应用实例。

#### 参数

- `rootComponent: Component` - 根组件

#### 返回值

- `App` - 应用实例，包含以下方法：
  - `mount(container: string | Element)` - 挂载应用

#### 示例

```javascript
import { createApp, h } from 'guoba-mini-vue'

const App = {
  setup() {
    return {
      message: 'Hello World'
    }
  },
  render() {
    return h('div', this.message)
  }
}

createApp(App).mount('#app')
```

---

### h

创建虚拟节点。

#### 参数

- `type: string | Component` - 节点类型
- `props?: object` - 属性对象
- `children?: any` - 子节点

#### 返回值

- `VNode` - 虚拟节点

#### 示例

```javascript
import { h } from 'guoba-mini-vue'

// 创建元素节点
h('div', { class: 'container' }, 'Hello')

// 创建组件节点
h(MyComponent, { message: 'Hello' })

// 创建带子元素的节点
h('ul', [
  h('li', 'Item 1'),
  h('li', 'Item 2')
])
```

---

### nextTick

在下次 DOM 更新循环结束后执行回调。

#### 参数

- `fn?: () => void` - 回调函数（可选）

#### 返回值

- `Promise<void>` - Promise 对象

#### 示例

```javascript
import { nextTick } from 'guoba-mini-vue'

// 使用回调
nextTick(() => {
  console.log('DOM 已更新')
})

// 使用 Promise
await nextTick()
console.log('DOM 已更新')
```

---

### provide

提供一个值，可以被后代组件注入。

#### 参数

- `key: string | symbol` - 注入的键
- `value: any` - 提供的值

#### 示例

```javascript
import { provide } from 'guoba-mini-vue'

const Parent = {
  setup() {
    provide('theme', 'dark')
  }
}
```

---

### inject

注入一个由祖先组件提供的值。

#### 参数

- `key: string | symbol` - 注入的键
- `defaultValue?: any` - 默认值（可选）

#### 返回值

- `any` - 注入的值

#### 示例

```javascript
import { inject } from 'guoba-mini-vue'

const Child = {
  setup() {
    const theme = inject('theme', 'light')
    return { theme }
  }
}
```

---

### getCurrentInstance

获取当前组件实例。

#### 返回值

- `ComponentInternalInstance | null` - 组件实例

#### 示例

```javascript
import { getCurrentInstance } from 'guoba-mini-vue'

const MyComponent = {
  setup() {
    const instance = getCurrentInstance()
    console.log(instance)
  }
}
```

#### 注意事项

- 只能在 setup 或生命周期钩子中调用
- 在组件卸载后返回 null

---

### setCurrentInstance

设置当前组件实例（内部使用）。

#### 参数

- `instance: ComponentInternalInstance | null` - 组件实例

---

### registerRuntimeCompiler

注册运行时编译器。

#### 参数

- `compile: (template: string) => RenderFunction` - 编译函数

#### 示例

```javascript
import { registerRuntimeCompiler } from 'guoba-mini-vue'

registerRuntimeCompiler((template) => {
  // 编译模板为渲染函数
  return renderFunction
})
```

---

## 虚拟节点 API

### createTextVnode

创建文本虚拟节点。

#### 参数

- `text: string` - 文本内容

#### 返回值

- `VNode` - 文本虚拟节点

#### 示例

```javascript
import { createTextVnode } from 'guoba-mini-vue'

const textNode = createTextVnode('Hello World')
```

---

### createElementVnode

创建元素虚拟节点。

#### 参数

- `tag: string` - 标签名
- `props?: object` - 属性对象
- `children?: any` - 子节点

#### 返回值

- `VNode` - 元素虚拟节点

#### 示例

```javascript
import { createElementVnode } from 'guoba-mini-vue'

const vnode = createElementVnode('div', { class: 'container' }, 'Hello')
```

---

### renderSlots

渲染插槽。

#### 参数

- `slots: object` - 插槽对象
- `name: string` - 插槽名称
- `props?: object` - 插槽属性

#### 返回值

- `VNode[]` - 虚拟节点数组

#### 示例

```javascript
import { renderSlots } from 'guoba-mini-vue'

const slots = {
  default: () => h('div', 'Default slot'),
  header: () => h('header', 'Header')
}

renderSlots(slots, 'default')
```

---

### toDisplayString

将值转换为显示字符串。

#### 参数

- `value: any` - 要转换的值

#### 返回值

- `string` - 显示字符串

#### 示例

```javascript
import { toDisplayString } from 'guoba-mini-vue'

console.log(toDisplayString(null)) // ''
console.log(toDisplayString(undefined)) // ''
console.log(toDisplayString(0)) // '0'
console.log(toDisplayString('hello')) // 'hello'
```

---

## 错误处理

### 常见错误

#### 1. Cannot read property 'value' of undefined

**原因**：尝试访问未初始化的 ref

**解决**：确保 ref 已正确初始化

```javascript
const count = ref(0)
console.log(count.value) // 正确
```

#### 2. Cannot add property xxx, object is not extensible

**原因**：尝试在只读对象上添加属性

**解决**：不要修改 readonly 对象

```javascript
const state = readonly({ count: 0 })
state.newProp = 1 // 错误
```

#### 3. Target is not a valid reactive target

**原因**：尝试对非对象类型使用 reactive

**解决**：对基本类型使用 ref

```javascript
const count = reactive(0) // 错误
const count = ref(0) // 正确
```

---

## 类型定义

### Ref

```typescript
interface Ref<T> {
  value: T
}
```

### ComputedRef

```typescript
interface ComputedRef<T> extends Ref<T> {
  readonly value: T
}
```

### Component

```typescript
interface Component {
  setup?: () => object
  render?: () => VNode
}
```

### VNode

```typescript
interface VNode {
  type: string | Component
  props: object
  children: any
  shapeFlag: number
  key: string | number | null
  el: Element | null
}
```

---

## 最佳实践

1. **使用 ref 包装基本类型**：`ref` 适合包装基本类型，`reactive` 适合对象
2. **避免解构响应式对象**：解构会失去响应性
3. **合理使用 computed**：对于复杂的派生状态使用 computed
4. **及时停止副作用**：在组件卸载时停止不需要的副作用
5. **使用 readonly 保护数据**：对于不应该被修改的数据使用 readonly

---

## 更多信息

- 查看 [README.md](./README.md) 了解项目概况
- 查看 [EXAMPLES.md](./EXAMPLES.md) 查看更多示例
- 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何贡献代码
