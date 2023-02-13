import { ErrorBoundary } from './components/ErrorBoundary'
import { Playground } from './components/Playground'

export default function App() {
  return (
    <ErrorBoundary>
      <Playground />
    </ErrorBoundary>
  )
}
