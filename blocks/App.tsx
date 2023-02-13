import { type FileBlockProps, getLanguageFromFilename } from '@githubnext/blocks'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

export default function App({ content, context, metadata }: FileBlockProps) {
  const extension = (context.path ? getLanguageFromFilename(context.path) : 'n/a') === 'JavaScript' ? 'js' : 'ts'

  return (
    <ErrorBoundary>
      <Playground content={content} extension={extension} metadata={metadata} />
    </ErrorBoundary>
  )
}
