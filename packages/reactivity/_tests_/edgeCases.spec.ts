import { reactive, readonly } from '../src/reactive'
import { ref } from '../src/ref'
import { computed } from '../src/computed'
import { effect, stop } from '../src/effect'
import { vi } from 'vitest'

describe('Edge Cases and Error Handling', () => {
    describe('reactive edge cases', () => {
        it('should handle null and undefined values', () => {
            const nullObj = reactive(null as any)
            expect(nullObj).toBe(null)

            const undefinedObj = reactive(undefined as any)
            expect(undefinedObj).toBe(undefined)
        })

        it('should handle primitive values', () => {
            const primitive = reactive(123 as any)
            expect(primitive).toBe(123)
        })

        it('should handle deeply nested objects', () => {
            const obj = reactive({
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                value: 'deep'
                            }
                        }
                    }
                }
            })
            expect(obj.level1.level2.level3.level4.value).toBe('deep')
        })
    })

    describe('readonly edge cases', () => {
        it('should warn when setting value on readonly object', () => {
            const obj = readonly({ foo: 1 })
            const consoleWarn = vi.spyOn(console, 'warn')
            obj.foo = 2
            expect(consoleWarn).toHaveBeenCalled()
            expect(obj.foo).toBe(1)
            consoleWarn.mockRestore()
        })

        it('should handle null and undefined values', () => {
            const nullObj = readonly(null as any)
            expect(nullObj).toBe(null)

            const undefinedObj = readonly(undefined as any)
            expect(undefinedObj).toBe(undefined)
        })
    })

    describe('ref edge cases', () => {
        it('should handle null and undefined values', () => {
            const nullRef = ref(null)
            expect(nullRef.value).toBe(null)

            const undefinedRef = ref(undefined)
            expect(undefinedRef.value).toBe(undefined)
        })

        it('should handle nested ref objects', () => {
            const nestedRef = ref({
                count: ref(1),
                name: 'test'
            })
            expect(nestedRef.value.count.value).toBe(1)
        })
    })

    describe('computed edge cases', () => {
        it('should handle circular dependencies gracefully', () => {
            const a = ref(1)
            const b = ref(2)

            const computedA = computed(() => a.value + b.value)
            const computedB = computed(() => computedA.value - a.value)

            expect(computedB.value).toBe(2)
        })

        it('should handle error in getter', () => {
            const shouldThrow = ref(false)
            const computedValue = computed(() => {
                if (shouldThrow.value) {
                    throw new Error('Computed error')
                }
                return 'safe'
            })

            expect(computedValue.value).toBe('safe')

            shouldThrow.value = true
            expect(() => computedValue.value).toThrow()
        })
    })

    describe('effect edge cases', () => {
        it('should handle multiple effects on same reactive object', () => {
            const obj = reactive({ count: 0 })
            const results: number[] = []

            effect(() => {
                results.push(obj.count * 2)
            })

            effect(() => {
                results.push(obj.count + 1)
            })

            expect(results).toEqual([0, 1])

            obj.count = 1
            expect(results).toEqual([0, 1, 2, 2])
        })
    })

    describe('performance edge cases', () => {
        it('should handle large number of reactive updates efficiently', () => {
            const obj = reactive({ count: 0 })
            let callCount = 0

            effect(() => {
                callCount++
                obj.count
            })

            for (let i = 0; i < 1000; i++) {
                obj.count = i
            }

            expect(callCount).toBe(1001)
        })

        it('should handle large nested reactive objects', () => {
            const largeObj: any = {}
            let current = largeObj

            for (let i = 0; i < 100; i++) {
                current.next = {}
                current = current.next
            }
            current.value = 'end'

            const reactiveObj = reactive(largeObj)
            let currentReactive = reactiveObj

            for (let i = 0; i < 100; i++) {
                currentReactive = currentReactive.next
            }

            expect(currentReactive.value).toBe('end')
        })
    })
})
