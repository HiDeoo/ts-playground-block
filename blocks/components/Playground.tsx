import { useEffect, useRef } from 'react'

import { isLocalStorageAvailable } from '../libs/dom'
import { getLatestTSVersion } from '../libs/typescript'

export function Playground({ content, extension }: PlaygroundProps) {
  const editor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadPlayground() {
      if (!editor.current || editor.current.childElementCount > 0) {
        return
      }

      if (!isLocalStorageAvailable()) {
        throw new Error('Local storage is not available in your browser and is required for the Playground to work.')
      }

      const tsVersion = await getLatestTSVersion()

      const getLoaderScript = document.createElement('script')
      getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js'
      getLoaderScript.async = true

      getLoaderScript.addEventListener('load', () => {
        window.require.config({
          ignoreDuplicateModules: ['vs/editor/editor.main'],
          paths: {
            vs: `https://typescript.azureedge.net/cdn/${tsVersion}/monaco/min/vs`,
            sandbox: 'https://www.typescriptlang.org/js/sandbox',
          },
        })

        window.require(
          ['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'],
          (
            main: typeof import('monaco-editor') | undefined,
            _tsWorker: typeof import('@typescript/sandbox/dist/tsWorker').TypeScriptWorker | undefined,
            sandboxFactory: typeof import('@typescript/sandbox') | undefined
          ) => {
            // Importing `vs/language/typescript/tsWorker` will set `ts` as a global.
            if (!main || !window.ts || !sandboxFactory) {
              // TODO(HiDeoo)
              console.error('NOT LOADED')
              return
            }

            sandboxFactory.createTypeScriptSandbox(
              {
                acquireTypes: true,
                compilerOptions: {},
                domID: 'editor',
                filetype: extension,
                supportTwoslashCompilerOptions: true,
                text: content,
              },
              main,
              window.ts
            )

            // TODO(HiDeoo) setup playground
          }
        )
      })

      document.body.append(getLoaderScript)
    }

    loadPlayground().catch((error) => {
      // TODO(HiDeoo)
      console.error('🚨 [Playground.tsx:19] error:', error)
    })
  }, [content, extension])

  return <div ref={editor} id="editor" style={{ height: 400 }} />
}

interface PlaygroundProps {
  content: string
  extension: 'js' | 'ts'
}
