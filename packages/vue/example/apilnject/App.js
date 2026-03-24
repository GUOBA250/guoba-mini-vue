import { h, inject, provide } from '../lib/guoba-mini-vue.esm.js'

const Provider = {
    name: 'Provider',
    setup() {
        provide('foo', 'fooVal')
        provide('bar', 'barVal')
        return {}
    },
    render() {
        return h('div', {}, [h('div', {}, 'Provider'), h(Consumer)])
    }
}

const Consumer = {
    name: 'Consumer',
    setup() {
        const foo = inject('foo')
        const bar = inject('bar')
        const baz = inject('baz', () => 'bazDefault')

        return {
            foo,
            bar,
            baz
        }
    },

    render() {
        return h('div', {}, `Consumer: ${this.foo} - ${this.bar} - ${this.baz}`)
    }
}

export default {
    name: 'App',
    setup() {},
    render() {
        return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)])
    }
}
