import { createVnode } from './vnode'

export function createAppAPI(render: any) {
    return function createApp(rootComponent: any) {
        return {
            mount(rootContainer: any) {
                const initialVnode = createVnode(rootComponent)
                render(initialVnode, rootContainer)
            }
        }
    }
}
