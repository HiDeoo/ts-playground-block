import { type FileBlockProps } from '@githubnext/blocks'
import { useCallback, useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { getConfigFromMetadata, type Config } from '../libs/config'

export function useConfig(
  metadata: FileBlockProps['metadata'],
  updateMetadata: FileBlockProps['onUpdateMetadata']
): UseConfigReturnValue {
  const handleError = useErrorHandler()
  const [config, setConfig] = useState<MaybeConfig>(undefined)

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

  const saveConfig = useCallback(() => {
    updateMetadata({ version: config?.version.current })
  }, [config, updateMetadata])

  const updateConfig = useCallback((updater: (prevState: MaybeConfig) => MaybeConfig) => {
    setConfig(updater)
  }, [])

  return { config, saveConfig, updateConfig }
}

type MaybeConfig = Config | undefined

export interface UseConfigReturnValue {
  config: MaybeConfig
  saveConfig: () => void
  updateConfig: (updater: (prevState: MaybeConfig) => MaybeConfig) => void
}
