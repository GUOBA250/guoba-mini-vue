import { NodeTypes } from '../ast'
import { create_element_vnode } from '../runtimehelpers'

export function transformElement(node: any, context: any) {
    if (node.type === NodeTypes.ELEMENT) {
        return () => {
            context.helper(create_element_vnode)

            const vnodeTag = `'${node.tag}'`
            let vnodeProps

            const children = node.children
            let vnodeChildren = children[0]
            const child = children[0]

            const vnodeElement = {
                type: NodeTypes.ELEMENT,
                tag: vnodeTag,
                props: vnodeProps,
                children: vnodeChildren
            }

            node.codegenNode = vnodeElement
        }
    }
}
