import { ShapeFlags } from '@guoba-mini-vue/shared'

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

export { createVnode as createElementVNode }

export function createVnode(type: any, props?: any, children?: any, key?: any) {
    const vnode = {
        type,
        props,
        children,
        component: null,
        shapeFlag: getShapeFlag(type),
        el: null,
        key: props && props.key
    }

    if (typeof children === 'string') {
        vnode.shapeFlag |= ShapeFlags.text_children
    } else if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.array_children
    }

    if (vnode.shapeFlag & ShapeFlags.stateful_component) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= ShapeFlags.slot_children
        }
    }

    return vnode
}
function getShapeFlag(type: any) {
    return typeof type === 'string' ? ShapeFlags.element : ShapeFlags.stateful_component
}

export function createTextVnode(text: string) {
    return createVnode(Text, {}, text)
}
