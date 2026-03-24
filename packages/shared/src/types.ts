export interface VNode {
    type: string | object
    props?: Record<string, any> | string
    children?: string | VNode[]
}

export interface Component {
    render?: () => VNode
    setup?: () => Record<string, any>
}

export interface ComponentInstance {
    vnode: VNode
    type: Component
    setupstate?: Record<string, any>
    render?: () => VNode
}

export interface ReactiveEffect {
    _fn: () => any
    deps: Set<ReactiveEffect>
    active: boolean
    onStop?: () => void
    scheduler?: () => void
    run(): any
    stop(): void
}
