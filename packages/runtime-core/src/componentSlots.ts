import { ShapeFlags } from '@guoba-mini-vue/shared'

export function initSlots(instance: any, children: any) {
    const { vnode } = instance
    if (vnode.shapeFlag & ShapeFlags.slot_children) {
        normalizeObjextSlots(children, instance.slots)
    }
}

function normalizeSlots(value: any) {
    return Array.isArray(value) ? value : [value]
}

function normalizeObjextSlots(children: any, slots: any) {
    for (const key in children) {
        const value = children[key]
        slots[key] = (props: any) => normalizeSlots(value(props))
    }
}
