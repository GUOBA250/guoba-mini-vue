import { h, ref } from '../lib/guoba-mini-vue.esm.js'

export default {
    name: 'Child',
    setup(props, { emit }) {},
    render(proxy) {
        return h('div', {}, [h('div', {}, 'child - prop - msg: ' + this.$props.msg)])
    }
}
