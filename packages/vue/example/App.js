import {
    h,
    createTextVnode,
    getCurrentInstance,
    provide,
    inject
} from '../lib/guoba-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
    name: 'App',
    render() {
        const app = h('div', {}, 'App')
        const foo = h(
            Foo,
            {},
            {
                header: ({ age }) => [h('p', {}, 'header' + age), createTextVnode('你好呀')],
                footer: () => h('p', {}, 'footer')
            }
        )

        const provider = h(Provider)

        return h('div', {}, [app, foo, provider])
    },
    setup() {
        const instance = getCurrentInstance()
        console.log('App:', instance)
    }
}

const Provider = {
    name: 'Provider',
    setup() {
        provide('foo', 'fooVal')
        provide('bar', 'barVal')
    },
    render() {
        return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)])
    }
}

const ProviderTwo = {
    name: 'ProviderTwo',
    setup() {
        provide('foo', 'fooTwo')
        const foo = inject('foo')
        return {
            foo
        }
    },
    render() {
        return h('div', {}, [h('p', {}, `ProviderTwo foo: ${this.foo}`), h(Consumer)])
    }
}

const Consumer = {
    name: 'Consumer',
    setup() {
        const foo = inject('foo')
        const bar = inject('bar')
        const baz = inject('baz', 'bazDefault')

        return {
            foo,
            bar,
            baz
        }
    },

    render() {
        return h('div', {}, `Cousumer: ${this.foo} - ${this.bar} - ${this.baz}`)
    }
}
