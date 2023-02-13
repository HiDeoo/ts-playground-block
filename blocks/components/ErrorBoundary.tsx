import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error }: FallbackProps) {
  // TODO(HiDeoo) UI
  // TODO(HiDeoo) Content
  return <div>Something went wront: {error.message}</div>
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}
