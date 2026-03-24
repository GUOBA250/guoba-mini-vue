export * from '@guoba-mini-vue/runtime-core'
export * from '@guoba-mini-vue/shared'

import { baseCompile } from '@guoba-mini-vue/compiler-core'
import * as runtimeDom from '@guoba-mini-vue/runtime-dom'
import { registerRuntimeCompiler } from '@guoba-mini-vue/runtime-core'

function compileToFunction(template: string) {
    const { code } = baseCompile(template)
    const render = new Function('Vue', code)(runtimeDom)

    return render
}

registerRuntimeCompiler(compileToFunction)
