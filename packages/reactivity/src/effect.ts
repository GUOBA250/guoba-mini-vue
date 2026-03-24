import { extend } from '@guoba-mini-vue/shared'

export class ReactiveEffect {
    private _fn: any
    deps: any[] = []
    active = true
    onStop?: () => void

    constructor(
        fn: any,
        public scheduler?: () => void
    ) {
        this._fn = fn
    }

    run() {
        shouldTrack = true
        activeEffect = this
        const result = this._fn()

        shouldTrack = false

        return result
    }

    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }
    }
}

function cleanupEffect(effect: any) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    })
    effect.deps.length = 0
}

export function isTracking() {
    return shouldTrack && activeEffect !== undefined
}

const targetMap = new Map()
let activeEffect: ReactiveEffect | undefined
let shouldTrack: boolean = false

export function effect(fn: any, options: any = {}) {
    //fn
    const _effect = new ReactiveEffect(fn, options.scheduler)
    //extend
    extend(_effect, options)

    _effect.run()

    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect

    return runner
}

export function track(target: any, key: any) {
    if (!isTracking()) return

    if (!activeEffect) return
    let depsMap = targetMap.get(target)

    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    trackEffects(dep)
}

export function trigger(target: any, key: any) {
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    triggerEffects(dep)
}

export function stop(runner: any) {
    runner.effect.stop()
}

export function trackEffects(dep: any) {
    if (!activeEffect) return
    if (dep.has(activeEffect)) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}

export function triggerEffects(dep: any) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}
