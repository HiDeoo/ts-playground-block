import { AlertIcon } from '@primer/octicons-react'
import { Box, Flash, FormControl, Link, StyledOcticon, Text, Textarea } from '@primer/react'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error }: FallbackProps) {
  const message = error.stack ?? error.message
  const messageLineCount = message.split('\n').length

  return (
    <Box p={2}>
      <Flash variant="danger" sx={{ color: 'danger.fg' }}>
        <StyledOcticon icon={AlertIcon} />
        Something went wrong!
        <Text as="p" sx={{ fontSize: 1 }}>
          You can report this error by opening a new issue in the{' '}
          <Link href="https://github.com/HiDeoo/ts-playground-block/issues/new/choose" target="_blank">
            HiDeoo/ts-playground-block
          </Link>{' '}
          repository with the error below.
        </Text>
      </Flash>
      <FormControl>
        <FormControl.Label sx={{ mt: 2 }}>Error</FormControl.Label>
        <Textarea
          onFocus={selectTextOnFocus}
          resize="none"
          rows={messageLineCount}
          sx={{ width: '100%' }}
          value={message}
        />
      </FormControl>
    </Box>
  )
}

function selectTextOnFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
  event.target.select()
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}
