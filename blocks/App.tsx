import { type FileBlockProps } from '@githubnext/blocks'
import BaseStyles from '@primer/react/lib/BaseStyles'
import { ThemeProvider } from '@primer/react/lib/ThemeProvider'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

import './styles/app.css'

export default function App({ content, context, isEditable, metadata, onUpdateMetadata }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles className="base">
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
