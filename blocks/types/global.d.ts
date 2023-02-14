export declare global {
  interface RequireConfig {
    ignoreDuplicateModules?: string[]
  }

  interface Require {
    reset(): void
  }

  interface Window {
    require: Require
    ts: typeof import('typescript') | undefined
  }
}
