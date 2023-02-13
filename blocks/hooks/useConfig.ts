import { type FileBlockProps } from '@githubnext/blocks'
import { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { getConfigFromMetadata, type Config } from '../libs/config'

export function useConfig(metadata: FileBlockProps['metadata']) {
  const handleError = useErrorHandler()
  const [config, setConfig] = useState<Config | undefined>(undefined)

  useEffect(() => {
    let ignoreConfig = false

    async function getConfig() {
      const parsedConfig = await getConfigFromMetadata(metadata)

      if (!ignoreConfig) {
        setConfig(parsedConfig)
      }
    }

    getConfig().catch(handleError)

    return () => {
      ignoreConfig = true
    }
  }, [handleError, metadata])

  return config
}
