import { type FileBlockProps } from '@githubnext/blocks'
import { ZapIcon } from '@primer/octicons-react'
import { Box, Button, Select } from '@primer/react'

import { type MaybeConfig, type UseConfigReturnValue } from '../hooks/useConfig'

import { Loader } from './Loader'

export function Header({ isEditable, isSandboxReady, onVersionChange, saveConfig, config }: HeaderProps) {
  function handleVersionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onVersionChange(event.target.value)
  }

  const isLoaderVisible = !isSandboxReady
  const isConfigVisible = config !== undefined
  const isConfigEditable = isEditable && isConfigVisible && !isLoaderVisible

  return (
    <Box
      sx={{
        alignItems: 'center',
        bg: 'canvas.subtle',
        borderBottomColor: 'border.default',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        display: 'flex',
        gap: 2,
        p: 2,
      }}
    >
      {isLoaderVisible ? <Loader /> : null}
      <Box sx={{ flex: 1 }} />
      {isConfigVisible ? (
        <>
          <Select onChange={handleVersionChange} value={config.version.current} disabled={!isConfigEditable}>
            {config.version.available.map((version) => (
              <Select.Option key={version} value={version}>
                v{version}
              </Select.Option>
            ))}
          </Select>
          {isEditable ? (
            <Button variant="primary" leadingIcon={ZapIcon} onClick={saveConfig} disabled={!isConfigEditable}>
              Save
            </Button>
          ) : null}
        </>
      ) : null}
    </Box>
  )
}

interface HeaderProps {
  config: MaybeConfig
  isEditable: FileBlockProps['isEditable']
  isSandboxReady: boolean
  onVersionChange: (version: string) => void
  saveConfig: UseConfigReturnValue['saveConfig']
}
