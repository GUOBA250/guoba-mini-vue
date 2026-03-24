import Child from './Child.js'
import { h, ref } from '../lib/guoba-mini-vue.esm.js'

export default {
    name: 'App',
    setup() {
        const msg = ref('123')
        const count = ref(1)

        window.msg = msg
        const changeChildeProps = () => {
            msg.value = '456'
        }
        const changeCount = () => {
            count.value++
        }
        return {
            msg,
            count,
            changeChildeProps,
            changeCount
        }
    },

    render() {
        return h('div', {}, [
            h(
                'button',
                {
                    onClick: this.changeChildeProps
                },
                'changeChildeProps'
            ),
            h(Child, {
                msg: this.msg
            }),
            h(
                'button',
                {
                    onClick: this.changeCount
                },
                'change self Count'
            ),
            h('p', {}, 'count: ' + this.count)
        ])
    }
}
