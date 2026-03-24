import { NodeTypes } from '../ast'

import { to_display_string } from '../runtimehelpers'

export function transformText(node: any, context: any) {
    function isText(node: any) {
        return node.type === NodeTypes.TEXT || node.type === NodeTypes.INTERPOLATION
    }

    if (node.type === NodeTypes.ELEMENT) {
        return () => {
            const { children } = node
            let curContainer
            for (let i = 0; i < children.length; i++) {
                const child = children[i]
                if (isText(child)) {
                    for (let j = i + 1; j < children.length; j++) {
                        const grandChild = children[j]
                        if (isText(grandChild)) {
                            if (!curContainer) {
                                curContainer = children[i] = {
                                    type: NodeTypes.COMPOUND_EXPRESSION,
                                    children: [child]
                                }
                            }

                            curContainer.children.push(' + ')
                            curContainer.children.push(grandChild)
                            children.splice(j, 1)
                            j--
                        } else {
                            curContainer = undefined
                            break
                        }
                    }
                }
            }
        }
    }
}
