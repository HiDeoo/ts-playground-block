import { type FileBlockProps } from '@githubnext/blocks'

import { getTSVersion } from './typescript'

export async function getConfigFromMetadata({ version }: FileBlockProps['metadata']): Promise<Config> {
  const tsVersion = await getTSVersion(typeof version === 'string' ? version : undefined)

  return {
    version: tsVersion,
  }
}

export interface Config {
  version: string
}
