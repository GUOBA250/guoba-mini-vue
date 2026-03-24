export const extend = Object.assign

export { toDisplayString } from './toDisplayString'
export { ShapeFlags } from './ShapeFlags'

export const isObject = (val: unknown) => {
    return val !== null && typeof val === 'object'
}

export const hasChanged = (value: unknown, newvalue: unknown) => {
    return !Object.is(value, newvalue)
}

export * from './types'

export const hasOwn = (val: any, key: string) => Object.prototype.hasOwnProperty.call(val, key)

export const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: string) => {
        return c ? c.toUpperCase() : ''
    })
}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalize(str) : ''
}

export const isString = (val: unknown) => typeof val === 'string'
