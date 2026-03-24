import { createComponentInstance, setupComponent } from './component'
import { isObject } from '@guoba-mini-vue/shared'
import { ShapeFlags } from '@guoba-mini-vue/shared'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp'
import { effect } from '@guoba-mini-vue/reactivity'
import { shouldUpdateComponent } from './componentUpdateUtils'
import { queueJobs } from './scheduler'

export function createRenderer(options: any) {
    const {
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        insert: hostInsert,
        remove: hostRemove,
        setElementText: hostSetElementText,
        createTextNode: hostCreateTextNode
    } = options

    function render(vnode: any, container: any, app?: any) {
        patch(vnode, container, app)
    }

    function patch(vnode: any, container: any, parent?: any, prevVnode?: any, anchor?: any) {
        if (!vnode) {
            return
        }

        const { shapeFlag } = vnode

        switch (vnode.type) {
            case Fragment:
                processFragment(vnode, container, parent)
                break
            case Text:
                processText(vnode, container, parent)
                break
            default:
                if (shapeFlag & ShapeFlags.element) {
                    processElement(prevVnode, vnode, container, parent, anchor)
                } else if (shapeFlag & ShapeFlags.stateful_component) {
                    processComponent(prevVnode, vnode, container, parent)
                }
                break
        }
    }

    function processComponent(n1: any, n2: any, container: any, parent: any) {
        if (!n1) {
            mountComponent(n2, container, null, parent)
        } else {
            updateComponent(n1, n2)
        }
    }

    function mountComponent(initialVnode: any, container: any, app?: any, parent?: any) {
        const instance = (initialVnode.component = createComponentInstance(initialVnode, parent))
        setupComponent(instance)

        if (app) {
            app.instance = instance
        }

        setupRenderEffect(instance, container, initialVnode)
    }

    function setupRenderEffect(instance: any, container: any, initialVnode: any) {
        let prevSubTree: any = null

        instance.update = effect(
            () => {
                if (!instance.isMounted) {
                    const { proxy } = instance
                    const subTree = (instance.subTree = instance.render.call(proxy, proxy))

                    patch(subTree, container, instance, prevSubTree)

                    initialVnode.el = subTree.el
                    prevSubTree = subTree
                    instance.subTree = subTree
                    instance.isMounted = true
                } else {
                    const { next, vnode } = instance
                    if (next) {
                        next.el = vnode.el

                        updateComponePreRender(instance, next)
                    }

                    const { proxy } = instance
                    const subTree = instance.render.call(proxy, proxy)
                    const prevSubTree = instance.subTree
                    instance.subTree = subTree
                    patch(subTree, container, instance, prevSubTree)
                }
            },
            {
                scheduler() {
                    queueJobs(instance.update)
                }
            }
        )
    }

    function processElement(n1: any, n2: any, container: any, parentComponent: any, anchor: any) {
        if (!n1) {
            mountElement(n2, container, parentComponent, anchor)
        } else {
            patchElement(n1, n2, container, parentComponent, anchor)
        }
    }

    function patchElement(n1: any, n2: any, container: any, parentComponent: any, anchor: any) {
        const oldProps = n1.props || {}
        const newProps = n2.props || {}
        const el = (n2.el = n1.el)

        patchChild(n1, n2, el, parentComponent, anchor)
        patchProps(el, oldProps, newProps)
    }

    function patchChildren(n1: any, n2: any, container: any) {
        const oldChildren = n1.children
        const newChildren = n2.children

        for (let i = 0; i < newChildren.length; i++) {
            const oldChild = oldChildren[i]
            const newChild = newChildren[i]
            patch(newChild, container, n2.parent, oldChild)
        }
    }

    function patchChild(n1: any, n2: any, container: any, parentComponent: any, anchor: any) {
        const prevShapeFlag = n1.shapeFlag
        const { shapeFlag } = n2
        const c1 = n1.children
        const c2 = n2.children
        if (shapeFlag & ShapeFlags.text_children) {
            if (prevShapeFlag & ShapeFlags.array_children) {
                unmountChildren(n1.children)
                hostSetElementText(container, c2)
            }
            if (c1 !== c2) {
                hostSetElementText(container, c2)
            }
        } else {
            if (prevShapeFlag & ShapeFlags.text_children) {
                hostSetElementText(container, '')
                mountChildren(c2, container, parentComponent)
            } else {
                patchKeyedChildren(c1, c2, container, parentComponent, anchor)
            }
        }
    }

    function unmountChildren(children: any) {
        for (let i = 0; i < children.length; i++) {
            const el = children[i].el
            hostRemove(el)
        }
    }

    function patchKeyedChildren(
        c1: any,
        c2: any,
        container: any,
        parentComponent: any,
        anchor: any
    ) {
        let i = 0
        let e1 = c1.length - 1
        let e2 = c2.length - 1

        while (i <= e1 && i <= e2) {
            const n1 = c1[i]
            const n2 = c2[i]
            if (isSomeVnodeType(n1, n2)) {
                patch(n2, container, parentComponent, n1, anchor)
            } else {
                break
            }
            i++
        }

        while (i <= e1 && i <= e2) {
            const n1 = c1[e1]
            const n2 = c2[e2]
            if (isSomeVnodeType(n1, n2)) {
                patch(n2, container, parentComponent, n1, anchor)
            } else {
                break
            }
            e1--
            e2--
        }

        if (i > e1) {
            if (i <= e2) {
                const nextPos = e2 + 1
                const anchor = nextPos < c2.length ? c2[nextPos].el : null
                while (i <= e2) {
                    patch(null, c2[i], container, parentComponent, anchor)
                    i++
                }
            }
        } else if (i > e2) {
            while (i <= e1) {
                hostRemove(c1[i].el)
                i++
            }
        } else {
            const s1 = i
            const s2 = i
            const keyToNewIndexMap = new Map()

            for (let i = s2; i <= e2; i++) {
                const nextChild = c2[i]
                keyToNewIndexMap.set(nextChild.key, i)
            }

            const toBePatched = e2 - s2 + 1
            const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
            let patched = 0
            let moved = false
            let maxNewIndexSoFar = 0

            for (let i = s1; i <= e1; i++) {
                const prevChild = c1[i]
                if (patched >= toBePatched) {
                    hostRemove(prevChild.el)
                    continue
                }

                let newIndex
                if (prevChild.key != null) {
                    newIndex = keyToNewIndexMap.get(prevChild.key)
                } else {
                    for (let j = s2; j <= e2; j++) {
                        if (isSomeVnodeType(prevChild, c2[j])) {
                            newIndex = j
                            break
                        }
                    }
                }

                if (newIndex === undefined) {
                    hostRemove(prevChild.el)
                } else {
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex
                    } else {
                        moved = true
                    }
                    newIndexToOldIndexMap[newIndex - s2] = i + 1
                    patch(c2[newIndex], container, parentComponent, prevChild, null)
                    patched++
                }
            }

            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : []
            let j = increasingNewIndexSequence.length - 1

            for (let i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = s2 + i
                const nextChild = c2[nextIndex]
                const anchor = nextIndex + 1 < c2.length ? c2[nextIndex + 1].el : null

                if (newIndexToOldIndexMap[i] === 0) {
                    patch(null, nextChild, container, parentComponent, anchor)
                } else if (moved) {
                    if (j < 0 || i !== increasingNewIndexSequence[j]) {
                        hostInsert(nextChild.el, container, anchor)
                    } else {
                        j--
                    }
                }
            }
        }
    }

    function getSequence(arr: number[]): number[] {
        const p = arr.slice()
        const result = [0]
        let i, j, u, v, c
        const len = arr.length

        for (i = 0; i < len; i++) {
            const arrI = arr[i]
            if (arrI !== 0) {
                j = result[result.length - 1]
                if (arr[j] < arrI) {
                    p[i] = j
                    result.push(i)
                    continue
                }
                u = 0
                v = result.length - 1
                while (u < v) {
                    c = (u + v) >> 1
                    if (arr[result[c]] < arrI) {
                        u = c + 1
                    } else {
                        v = c
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1]
                    }
                    result[u] = i
                }
            }
        }

        u = result.length
        v = result[u - 1]
        const seq = new Array(u)
        while (u-- > 0) {
            seq[u] = v
            v = p[v]
        }
        return seq
    }

    function patchProps(el: any, oldProps: any, newProps: any) {
        for (const key in newProps) {
            const prevProp = oldProps[key]
            const nextProp = newProps[key]
            if (prevProp !== nextProp) {
                hostPatchProp(el, key, prevProp, nextProp)
            }
        }

        for (const key in oldProps) {
            if (!(key in newProps)) {
                hostPatchProp(el, key, oldProps[key], null)
            }
        }
    }

    function mountElement(vnode: any, container: any, parent: any, anchor: any) {
        const el = (vnode.el = hostCreateElement(vnode.type))
        const { children, shapeFlag } = vnode

        if (vnode.shapeFlag & ShapeFlags.text_children) {
            el.textContent = children
        } else if (vnode.shapeFlag & ShapeFlags.array_children) {
            mountChildren(children, el, parent)
        }
        const { props } = vnode
        for (const key in props) {
            let val = props[key]
            hostPatchProp(el, key, null, val)
        }

        hostInsert(el, container, anchor)

        return el
    }

    function mountChildren(children: any, container: any, parent?: any) {
        if (Array.isArray(children)) {
            children.forEach((child: any) => {
                patch(child, container, parent)
            })
        }
    }

    function processFragment(vnode: any, container: any, parent?: any) {
        mountChildren(vnode, container, parent)
    }

    function processText(vnode: any, container: any, parent?: any) {
        const { children } = vnode
        const textNode = (vnode.el = hostCreateTextNode(children))
        container.append(textNode)
    }

    return {
        createApp: createAppAPI(render)
    }
}
function isSomeVnodeType(n1: any, n2: any) {
    return n1.type === n2.type && n1.key === n2.key
}
function updateComponent(n1: any, n2: any) {
    const instance = (n2.component = n1.component)
    if (shouldUpdateComponent(n1, n2)) {
        instance.next = n2
        instance.update()
    } else {
        n2.el = n1.element
        instance.vnode = n2
    }
}
function updateComponePreRender(instance: any, nextVnode: any) {
    instance.vnode = nextVnode
    instance.next = null
    instance.props = nextVnode.props
}
