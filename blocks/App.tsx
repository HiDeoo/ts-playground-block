import { type FileBlockProps, getLanguageFromFilename } from '@githubnext/blocks'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

export default function App({ content, context, metadata, options }: AppProps) {
  // TODO(HiDeoo)
  // eslint-disable-next-line no-console
  console.log('🚨 [App.tsx:7] metadata:', metadata)
  // eslint-disable-next-line no-console
  console.log('🚨 [App.tsx:7] options:', options)

  const extension = (context.path ? getLanguageFromFilename(context.path) : 'N/A') === 'JavaScript' ? 'js' : 'ts'

  return (
    <ErrorBoundary>
      <Playground content={content} extension={extension} />
    </ErrorBoundary>
  )
}

interface AppProps extends FileBlockProps {
  options?: {
    version?: string
  }
}
