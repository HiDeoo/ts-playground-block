import { useEffect, useRef } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { createTwoslashInlayProvider } from '../libs/monaco'
import { tsVersionSupportsInlayHints, type TSSandbox } from '../libs/typescript'

export function Sandbox({ content, extension, onReady, version }: SandboxProps) {
  const editor = useRef<HTMLDivElement>(null)
  const sandbox = useRef<TSSandbox | undefined>(undefined)
  const handleError = useErrorHandler()

  useEffect(() => {
    if (!editor.current || editor.current.childElementCount > 0) {
      return
    }

    const getLoaderScript = document.createElement('script')
    getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js'
    getLoaderScript.async = true

    getLoaderScript.addEventListener('load', () => {
      // Changing version without reloading the page like the official Playground requires to reset the module manager.
      window.require.reset()

      window.require.config({
        ignoreDuplicateModules: ['vs/editor/editor.main'],
        paths: {
          vs: `https://typescript.azureedge.net/cdn/${version}/monaco/min/vs`,
          sandbox: 'https://www.typescriptlang.org/js/sandbox',
        },
      })

      window.require(
        ['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'],
        (
          monaco: typeof import('monaco-editor') | undefined,
          _tsWorker: typeof import('@typescript/sandbox/dist/tsWorker').TypeScriptWorker | undefined,
          sandboxFactory: typeof import('@typescript/sandbox') | undefined
        ) => {
          // Importing `vs/language/typescript/tsWorker` will set `ts` as a global.
          if (!monaco || !window.ts || !sandboxFactory) {
            console.error('Failed to load a Playground dependency:', {
              main: monaco,
              ts: window.ts,
              sandbox: sandboxFactory,
            })
            handleError(new Error('Failed to load the Playground, check the console for more details.'))
            return
          }

          sandbox.current = sandboxFactory.createTypeScriptSandbox(
            {
              acquireTypes: true,
              compilerOptions: {},
              domID: 'editor',
              filetype: extension,
              supportTwoslashCompilerOptions: true,
              text: content,
            },
            monaco,
            window.ts
          )

          sandbox.current.editor.updateOptions({ readOnly: true })

          if (tsVersionSupportsInlayHints(sandbox.current.ts.version)) {
            monaco.languages.registerInlayHintsProvider(
              sandbox.current.language,
              createTwoslashInlayProvider(sandbox.current)
            )
          }

          onReady()
        }
      )
    })

    document.body.append(getLoaderScript)

    return () => {
      getLoaderScript.remove()
    }
  }, [content, extension, handleError, onReady, version])

  useEffect(() => {
    if (!sandbox.current) {
      return
    }

    function handleResize() {
      sandbox.current?.editor.layout()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={editor} id="editor" className="editor" />
}

interface SandboxProps {
  content: string
  extension: 'js' | 'ts'
  onReady: () => void
  version: string
}
