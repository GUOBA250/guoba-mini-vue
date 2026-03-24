import { hasOwn } from '@guoba-mini-vue/shared'

const publicPropertiesMap = {
    $el: (i: any) => i.vnode.$el,
    $slots: (i: any) => i.slots,
    $props: (i: any) => i.props
}

export const publicInstanceProxyHandlers = {
    get({ _: instance }: { _: any }, key: string) {
        const { setupState, props } = instance
        if (key in setupState) {
            return setupState[key]
        }

        if (hasOwn(setupState, key)) {
            return setupState[key]
        } else if (hasOwn(props, key)) {
            return props[key]
        }

        const publicGetter = (publicPropertiesMap as Record<string, (i: any) => any>)[key]
        if (publicGetter) {
            return publicGetter(instance)
        }
    }
}
