import { type FileBlockProps } from '@githubnext/blocks'
import { useEffect, useRef, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { useConfig } from '../hooks/useConfig'
import { isLocalStorageAvailable } from '../libs/dom'

export function Playground({ content, extension, metadata }: PlaygroundProps) {
  const editor = useRef<HTMLDivElement>(null)
  const handleError = useErrorHandler()
  const [isLoading, setIsLoading] = useState(true)

  const config = useConfig(metadata)

  useEffect(() => {
    if (!config || !editor.current || editor.current.childElementCount > 0) {
      return
    }

    if (!isLocalStorageAvailable()) {
      throw new Error('Local storage is not available in your browser and is required for the Playground to work.')
    }

    const getLoaderScript = document.createElement('script')
    getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js'
    getLoaderScript.async = true

    getLoaderScript.addEventListener('load', () => {
      window.require.config({
        ignoreDuplicateModules: ['vs/editor/editor.main'],
        paths: {
          vs: `https://typescript.azureedge.net/cdn/${config.version}/monaco/min/vs`,
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
  }, [config, content, extension, handleError])

  const isReady = config !== undefined && !isLoading

  // TODO(HiDeoo) Loading UI
  return (
    <>
      {isReady ? (
        <div>
          <p>Version: {config.version}</p>
        </div>
      ) : (
        <div>Loading…</div>
      )}
      <div ref={editor} id="editor" style={{ height: 400 }} />
    </>
  )
}

interface PlaygroundProps {
  content: string
  extension: 'js' | 'ts'
  metadata: FileBlockProps['metadata']
}
