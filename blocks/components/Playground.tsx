import { useEffect, useRef, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { isLocalStorageAvailable } from '../libs/dom'
import { getLatestTSVersion } from '../libs/typescript'

export function Playground({ content, extension }: PlaygroundProps) {
  const editor = useRef<HTMLDivElement>(null)
  const handleError = useErrorHandler()
  const [isLoading, setIsLoading] = useState(true)

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
              console.error('Failed to load a Playground dependency:', { main, ts: window.ts, sandbox: sandboxFactory })
              handleError(new Error('Failed to load the Playground, check the console for more details.'))
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

            setIsLoading(false)

            // TODO(HiDeoo) setup playground
          }
        )
      })

      document.body.append(getLoaderScript)
    }

    loadPlayground().catch((error) => {
      handleError(error)
    })
  }, [content, extension, handleError])

  // TODO(HiDeoo) Loading UI
  return (
    <>
      {isLoading ? <div>Loading…</div> : null}
      <div ref={editor} id="editor" style={{ height: 400 }} />
    </>
  )
}

interface PlaygroundProps {
  content: string
  extension: 'js' | 'ts'
}
