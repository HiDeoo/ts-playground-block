export interface Example {
  name: string
  description: string
}

const example = {
  name: 'Version',
  description: 'This Playground is configured to load with a TypeScript version not supporting `satifies`.',
} satisfies Example
