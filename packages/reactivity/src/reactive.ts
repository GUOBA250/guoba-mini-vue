import { isObject } from '@guoba-mini-vue/shared'
import { ReactiveFlags } from './reactiveFlags'
import { reactive, readonly, shallowReadonlyHandlers } from './baseHandlers'

export { reactive, readonly }

export function isReactive(value: any) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value: any) {
    return !!value[ReactiveFlags.IS_READONLY]
}

export function shallowReadonly(raw: any) {
    if (!isObject(raw)) {
        return raw
    }
    return new Proxy(raw, shallowReadonlyHandlers)
}

export function isProxy(value: any) {
    return isReactive(value) || isReadonly(value)
}
