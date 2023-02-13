import { type FileBlockProps, getLanguageFromFilename } from '@githubnext/blocks'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

export default function App({ content, context }: FileBlockProps) {
  const extension = (context.path ? getLanguageFromFilename(context.path) : 'N/A') === 'JavaScript' ? 'js' : 'ts'

  return (
    <ErrorBoundary>
      <Playground content={content} extension={extension} />
    </ErrorBoundary>
  )
}
