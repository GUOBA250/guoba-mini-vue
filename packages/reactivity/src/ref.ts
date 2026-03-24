import { isTracking, trackEffects, triggerEffects } from './effect'
import { hasChanged, isObject } from '@guoba-mini-vue/shared'
import { reactive } from './reactive'

class RefImpl {
    private _value: any
    public dep
    private _rawValue: any
    public __v_isRef = true

    constructor(value: any) {
        this._rawValue = value
        this._value = convert(value)

        this.dep = new Set()
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue
            this._value = convert(newValue)
            triggerEffects(this.dep)
        }
    }
}

export function ref(value: any) {
    return new RefImpl(value)
}

export function isRef(ref: any) {
    return !!(ref && ref.__v_isRef)
}

export function unRef(ref: any) {
    return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs: any) {
    return new Proxy(objectWithRefs, {
        get(target, key) {
            return unRef(Reflect.get(target, key))
        },

        set(target, key, value, receiver) {
            if (isRef(target[key]) && !isRef(value)) {
                return (target[key].value = value)
            } else {
                return Reflect.set(target, key, value, receiver)
            }
        }
    })
}

function trackRefValue(ref: any) {
    if (isTracking()) {
        trackEffects(ref.dep)
    }
}

function convert(value: any) {
    return isObject(value) ? reactive(value) : value
}
