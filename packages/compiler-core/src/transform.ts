import { NodeTypes } from './ast'
import { helperMapName, to_display_string } from './runtimehelpers'

export function transform(root: any, options: any) {
    const context = createTransoformContext(root, options)
    traverseNode(root, context)

    createRootCodegen(root)
    root.helpers = [...context.helpers.keys()]
}

function traverseNode(node: any, context: any) {
    const nodeTransform = context.nodeTransform
    const exitFns: any = []
    for (let i = 0; i < nodeTransform.length; i++) {
        const transform = nodeTransform[i]
        const onExit = transform(node, context)
        if (onExit) {
            exitFns.push(onExit)
        }
    }

    switch (node.type) {
        case NodeTypes.INTERPOLATION:
            context.helper(to_display_string)
            break
        case NodeTypes.ROOT:
        case NodeTypes.ELEMENT:
            traverseChildren(node, context)
            break
        default:
            break
    }

    let i = exitFns.length
    while (i--) {
        exitFns[i]()
    }
}
function createTransoformContext(root: any, options: any) {
    const context = {
        root,
        helpers: new Map(),
        nodeTransform: options.nodeTransform || [],
        helper(key: symbol) {
            context.helpers.set(key, 1)
        }
    }
    return context
}

function traverseChildren(node: any, context: any) {
    const children = node.children
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const node = children[i]
            traverseNode(node, context)
        }
    }
}
function createRootCodegen(root: any) {
    const child = root.children[0]
    if (child.type === NodeTypes.ELEMENT) {
        root.codegenNode = child.codegenNode
    } else {
        root.codegenNode = root.children[0]
    }
}
