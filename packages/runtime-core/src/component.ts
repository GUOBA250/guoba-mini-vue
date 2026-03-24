import { shallowReadonly } from '@guoba-mini-vue/reactivity'
import { proxyRefs } from '@guoba-mini-vue/reactivity'
import { emit } from './componentEmit'
import { initProps } from './componentProps'
import { publicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'

export function createComponentInstance(initialVnode: any, parent: any) {
    const component = {
        vnode: initialVnode,
        type: initialVnode.type,
        next: null,
        setupState: {},
        props: {},
        slots: {},
        provides: parent && parent.provides ? Object.create(parent.provides) : {},
        parent,
        emit: () => {}
    }
    component.emit = emit.bind(null, component) as any
    return component
}

export function setupComponent(instance: any) {
    initProps(instance, instance.vnode.props)
    initSlots(instance, instance.vnode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    const Component = instance.vnode.type
    const { setup } = Component
    if (setup) {
        currentInstance = instance
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props), instance.emit)
        handleSetupResult(instance, setupResult)
    }
    setCurrentInstance(null)

    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers)
    finishComponentSetup(instance)
}

function handleSetupResult(instance: any, setupResult: any) {
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult)
    }
}

function finishComponentSetup(instance: any) {
    const Component = instance.type
    if (compiler && !Component.render) {
        if (Component.template) {
            Component.render = compiler(Component.template)
        }
    }
    if (Component.render) {
        instance.render = Component.render.bind(instance.proxy)
    }
}

let currentInstance: null = null

export function getCurrentInstance() {
    return currentInstance
}

export function setCurrentInstance(instance: any) {
    currentInstance = instance
}

let compiler: any = null
export function registerRuntimeCompiler(_compiler: any) {
    compiler = _compiler
}
