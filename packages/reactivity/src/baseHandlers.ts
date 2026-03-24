import { track, trigger } from './effect'
import { isObject } from '@guoba-mini-vue/shared'
import { ReactiveFlags } from './reactiveFlags'

function createGetter(isReadonly: boolean = false, shallow = false) {
    return function get(target: any, key: any) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key)

        if (shallow) {
            return res
        }

        if (isObject(res)) {
            if (isReadonly) {
                return readonly(res)
            } else {
                return reactive(res)
            }
        }
        if (!isReadonly) {
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target: any, key: any, value: any) {
        const res = Reflect.set(target, key, value)
        trigger(target, key)
        return res
    }
}

const mutableHandlers = {
    get: createGetter(false, false),
    set: createSetter()
}

const readonlyHandlers = {
    get: createGetter(true, false),
    set(target: any, key: any, value: any) {
        console.warn(`key ${key} set失败,因为target是readonly`, target)
        return true
    }
}

const shallowReadonlyHandlers = {
    get: createGetter(true, true),
    set(target: any, key: any, value: any) {
        console.warn(`key ${key} set失败,因为target是readonly`, target)
        return true
    }
}

export function reactive(raw: Record<string, any>) {
    if (!isObject(raw)) {
        return raw
    }
    return new Proxy(raw, mutableHandlers)
}

export function readonly(raw: any) {
    if (!isObject(raw)) {
        return raw
    }
    return new Proxy(raw, readonlyHandlers)
}

export { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers }
