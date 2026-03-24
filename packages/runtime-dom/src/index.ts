import { createRenderer } from '@guoba-mini-vue/runtime-core'

export function createElement(tag: string) {
    return document.createElement(tag)
}

export function createTextNode(text: string) {
    return document.createTextNode(text)
}

export function patchProp(el: Element, key: string, prevVal: any, nextVal: any) {
    const isOn = (key: string) => /^on[A-Z]/.test(key)

    if (isOn(key)) {
        const event = key.slice(2).toLowerCase()
        if (prevVal) {
            el.removeEventListener(event, prevVal)
        }
        if (nextVal) {
            el.addEventListener(event, nextVal)
        }
    } else {
        if (nextVal === undefined || nextVal === null) {
            el.removeAttribute(key)
        } else {
            el.setAttribute(key, nextVal)
        }
    }
}

export function insert(child: Node, parent: Node, anchor?: Node | null) {
    parent.insertBefore(child, anchor || null)
}

export function remove(child: Node) {
    const parent = child.parentNode
    if (parent) {
        parent.removeChild(child)
    }
}

export function setElementText(el: Element, text: string) {
    el.textContent = text
}

const renderer = createRenderer({
    createElement,
    createTextNode,
    patchProp,
    insert,
    remove,
    setElementText
})

export const createApp = renderer.createApp
