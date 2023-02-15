import { type languages } from 'monaco-editor'

import { type TSSandbox } from './typescript'

const twoslashInlayProviderPattern = /^\s*\/\/\s*\^\?$/gm

// https://github.com/microsoft/TypeScript-Website/blob/4a670b334df7be35c480f640009ce698a7bab02b/packages/playground/src/twoslashInlays.ts
export function createTwoslashInlayProvider(sandbox: TSSandbox) {
  const provider: languages.InlayHintsProvider = {
    provideInlayHints: async (model, _range, token) => {
      let match: RegExpExecArray | null
      const text = model.getValue()

      const results: languages.InlayHint[] = []
      const worker = await sandbox.getWorkerProcess()

      if (model.isDisposed()) {
        return getInlayProviderResults([])
      }

      while ((match = twoslashInlayProviderPattern.exec(text)) !== null) {
        const end = match.index + match[0].length - 1
        const endPos = model.getPositionAt(end)
        const inspectionPos = new sandbox.monaco.Position(endPos.lineNumber - 1, endPos.column)
        const inspectionOff = model.getOffsetAt(inspectionPos)

        if (token.isCancellationRequested) {
          return getInlayProviderResults([])
        }

        const hint = await worker.getQuickInfoAtPosition(`file://${model.uri.path}`, inspectionOff)

        if (!hint?.displayParts) {
          continue
        }

        // Inline hint
        let text = hint.displayParts
          .map((displayPart) => displayPart.text)
          .join('')
          .replace(/\\n/g, '')
          .replace(/ {2}/g, '')

        if (text.length > 120) {
          text = `${text.slice(0, 119)}…`
        }

        const inlay: languages.InlayHint = {
          kind: 0,
          label: text,
          paddingLeft: true,
          position: new sandbox.monaco.Position(endPos.lineNumber, endPos.column + 1),
        }

        results.push(inlay)
      }

      return getInlayProviderResults(results)
    },
  }

  return provider
}

function getInlayProviderResults(hints: languages.InlayHint[], dispose?: () => void) {
  return {
    hints: hints,
    dispose:
      dispose ??
      (() => {
        // noop
      }),
  }
}
