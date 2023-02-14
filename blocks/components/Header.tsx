import { type FileBlockProps } from '@githubnext/blocks'
import { ZapIcon } from '@primer/octicons-react'
import Box from '@primer/react/lib-esm/Box'
import { Button } from '@primer/react/lib-esm/Button/index'
import Select from '@primer/react/lib-esm/Select'

import { type UseConfigReturnValue } from '../hooks/useConfig'
import { type TSVersion } from '../libs/typescript'

export function Header({ isEditable, onVersionChange, saveConfig, version }: HeaderProps) {
  function handleVersionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onVersionChange(event.target.value)
  }

  return (
    <Box
      sx={{
        bg: 'canvas.subtle',
        borderBottomColor: 'border.default',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end',
        p: 2,
      }}
    >
      <Select onChange={handleVersionChange} value={version.current}>
        {version.available.map((version) => (
          <Select.Option key={version} value={version} disabled={!isEditable}>
            v{version}
          </Select.Option>
        ))}
      </Select>
      {isEditable ? (
        <Button variant="primary" leadingIcon={ZapIcon} onClick={saveConfig}>
          Save
        </Button>
      ) : null}
    </Box>
  )
}

interface HeaderProps {
  isEditable: FileBlockProps['isEditable']
  onVersionChange: (version: string) => void
  saveConfig: UseConfigReturnValue['saveConfig']
  version: TSVersion
}
