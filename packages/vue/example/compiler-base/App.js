import { ref } from '../lib/guoba-mini-vue.esm.js'

export default {
    name: 'App',
    template: '<div>hello, {{count}}</div>',
    setup() {
        const count = (window.count = ref(1))
        return {
            count
        }
    }
}
