import typescript from "@rollup/plugin-typescript"

export default {
    input: "./packages/vue/src/index.ts",
    output: [
        {
            file: "lib/guoba-mini-vue.cjs.js",
            format: "cjs",
            sourcemap: true,
            exports: "auto"
        },
        {
            file: "lib/guoba-mini-vue.esm.js",
            format: "es",
            sourcemap: true
        }
    ],
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json",
            module: "ES2020",
            target: "ES2020",
            moduleResolution: "node",
            skipLibCheck: true,
            exclude: ["**/*.spec.ts", "**/_tests_/**", "**/node_modules/**"]
        })
    ],
    treeshake: false,
    preserveEntrySignatures: 'strict'
}
