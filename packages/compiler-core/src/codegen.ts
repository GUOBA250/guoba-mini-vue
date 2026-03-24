import { isString } from '@guoba-mini-vue/shared'
import { NodeTypes } from './ast'
import { create_element_vnode, helperMapName, to_display_string } from './runtimehelpers'

export function generate(ast: any) {
    const context = createCodegenContext()
    const { push } = context

    genFunctionPreamble(ast, context)

    const functionName = 'render'
    const args = ['_ctx', '_cache']
    const signature = args.join(', ')

    push(`function ${functionName}(${signature}){`)
    push('return ')
    genNode(ast.codegenNode, context)
    push('}')

    return {
        code: context.code
    }
}

function genFunctionPreamble(ast: any, context: any) {
    const { push } = context
    const VueBinging = 'Vue'
    const aliasHelper = (s: symbol) => {
        const name = helperMapName[s as keyof typeof helperMapName]
        if (!name) {
            throw new Error(`Unknown helper symbol: ${String(s)}`)
        }
        return name
    }
    if (ast.helpers.length > 0) {
        push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging}`)
    }
    push('\n')
    push('return ')
}

function genNode(node: any, context: any) {
    switch (node.type) {
        case NodeTypes.TEXT:
            genText(context, node)
            break
        case NodeTypes.INTERPOLATION:
            genInterpolation(context, node)
            break
        case NodeTypes.SIMPLE_EXPRESSION:
            genExpression(context, node)
            break
        case NodeTypes.ELEMENT:
            genElement(context, node)
            break
        case NodeTypes.COMPOUND_EXPRESSION:
            genCompoundExpression(context, node)
            break
        default:
            break
    }
}
function genText(context: any, node: any) {
    const { push } = context
    push(`'${node.content}'`)
}

function createCodegenContext() {
    const context = {
        code: '',
        push(source: any) {
            context.code += source
        },
        helper(key: symbol) {
            return helperMapName[key as keyof typeof helperMapName]
        }
    }
    return context
}
function genInterpolation(context: any, node: any) {
    const { push, helper } = context
    push(`${helper(to_display_string)}(`)
    genNode(node.content, context)
    push(`)`)
}

function genExpression(context: any, node: any) {
    const { push } = context
    push(`${node.content}`)
}

function genElement(context: any, node: any) {
    const { push, helper } = context
    const { tag, children, props } = node
    push(`${helper(create_element_vnode)}(`)
    genNodeList(genNullable([tag, props, children]), context)
    push(')')
}

function genCompoundExpression(context: any, node: any) {
    const children = node.children
    const { push } = context
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (isString(child)) {
            push(child)
        } else {
            genNode(child, context)
        }
    }
}
function genNullable(args: any[]) {
    return args.map((arg) => (arg == null ? 'null' : arg))
}

function genNodeList(nodes: any[], context: any) {
    const { push } = context
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (isString(node)) {
            push(node)
        } else {
            genNode(node, context)
        }
        if (i < nodes.length - 1) {
            push(', ')
        }
    }
}
