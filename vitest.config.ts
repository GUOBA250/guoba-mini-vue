import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['**/*.{ts,tsx}'],
      exclude: ['**/*.spec.ts', '**/*.d.ts', '**/node_modules/**', '**/lib/**']
    }
  }
})
