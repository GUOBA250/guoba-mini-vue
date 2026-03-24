import { h, renderSlots, getCurrentInstance } from '../lib/guoba-mini-vue.esm.js'

export const Foo = {
    setup() {
        const instance = getCurrentInstance()
        console.log('Foo:', instance)
        return {}
    },
    render() {
        const foo = h('p', {}, 'foo')
        console.log(this.$slots)
        return h('div', {}, [
            renderSlots(this.$slots, 'header', {
                age: this.age
            }),
            foo,
            renderSlots(this.$slots, 'footer', {
                // age: this.age,
            })
        ])
    }
}
