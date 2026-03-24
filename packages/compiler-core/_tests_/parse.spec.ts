import { NodeTypes } from '../src/ast'
import { baseParse } from '../src/parse'

describe('parse', () => {
    it('simple interpolation', () => {
        const ast = baseParse('{{ message }}')
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.INTERPOLATION,
            content: {
                type: NodeTypes.SIMPLE_EXPRESSION,
                content: 'message'
            }
        })
    })
})

describe('element', () => {
    it('simple element div', () => {
        const ast = baseParse('<div></div>')
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.ELEMENT,
            tag: 'div'
        })
    })
})

describe('text', () => {
    it('simple text', () => {
        const ast = baseParse('hello world')
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.TEXT,
            content: 'hello world'
        })
    })
})

describe('text', () => {
    it('simple text', () => {
        const ast = baseParse('<div>hi, {{message}}</div>')
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.ELEMENT,
            tag: 'div',
            children: [
                {
                    type: NodeTypes.TEXT,
                    content: 'hi, '
                },
                {
                    type: NodeTypes.INTERPOLATION,
                    content: {
                        type: NodeTypes.SIMPLE_EXPRESSION,
                        content: 'message'
                    }
                }
            ]
        })
    })
})
