import { type FileBlockProps, getLanguageFromFilename } from '@githubnext/blocks'
import { useCallback, useState } from 'react'

import { useConfig } from '../hooks/useConfig'

import { Header } from './Header'
import { Sandbox } from './Sandbox'

export function Playground({ content, isEditable, metadata, path, updateMetadata }: PlaygroundProps) {
  const [isSandboxReady, setIsSandboxReady] = useState(false)

  const { config, saveConfig, updateConfig } = useConfig(metadata, updateMetadata)
  const extension = (path ? getLanguageFromFilename(path) : 'n/a') === 'JavaScript' ? 'js' : 'ts'

  const onSandBoxReady = useCallback(() => {
    setIsSandboxReady(true)
  }, [])

  const handleVersionChange = useCallback(
    (newVersion: string) => {
      setIsSandboxReady(false)

      updateConfig((config) => {
        if (!config) {
          return config
        }

        return {
          ...config,
          version: {
            ...config.version,
            current: newVersion,
          },
        }
      })
    },
    [updateConfig]
  )

  return (
    <>
      <Header
        config={config}
        isEditable={isEditable}
        isSandboxReady={isSandboxReady}
        onVersionChange={handleVersionChange}
        saveConfig={saveConfig}
      />
      {config ? (
        <Sandbox
          content={content}
          extension={extension}
          key={config.version.current}
          onReady={onSandBoxReady}
          version={config.version.current}
        />
      ) : null}
    </>
  )
}

interface PlaygroundProps {
  content: string
  isEditable: FileBlockProps['isEditable']
  metadata: FileBlockProps['metadata']
  path: string
  updateMetadata: FileBlockProps['onUpdateMetadata']
}
