import { type FileBlockProps } from '@githubnext/blocks'
import BaseStyles from '@primer/react/lib-esm/BaseStyles'
import { ThemeProvider } from '@primer/react/lib-esm/ThemeProvider'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

export default function App({ content, context, isEditable, metadata, onUpdateMetadata }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles>
          <Playground
            content={content}
            isEditable={isEditable}
            metadata={metadata}
            path={context.path}
            updateMetadata={onUpdateMetadata}
          />
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
