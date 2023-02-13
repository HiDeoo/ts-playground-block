export declare global {
  interface RequireConfig {
    ignoreDuplicateModules?: string[]
  }

  interface Window {
    require: Require
    ts: typeof import('typescript') | undefined
  }
}
