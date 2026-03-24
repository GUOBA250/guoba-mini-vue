import { baseParse } from '../src/parse'

import { NodeTypes } from '../src/ast'
import { generate } from '../src/codegen'
import { transform } from '../src/transform'
import { transformExpression } from '../src/transforms/transformExpression'
import { transformElement } from '../src/transforms/transformElement'
import { transformText } from '../src/transforms/transformText'

describe('codegen', () => {
    it('string', () => {
        const ast = baseParse('hi')
        transform(ast, {})
        const { code } = generate(ast)
        expect(code).toMatchSnapshot('hi')
    })
    it('interpolation', () => {
        const ast = baseParse('{{message}}')
        transform(ast, {
            nodeTransform: [transformExpression]
        })
        const { code } = generate(ast)
        expect(code).toMatchSnapshot()
    })
    it('element', () => {
        const ast = baseParse('<div>hi, {{message}}</div>')
        transform(ast, {
            nodeTransform: [transformExpression, transformElement, transformText]
        })
        const { code } = generate(ast)
        expect(code).toMatchSnapshot()
    })
})
