import { type FileBlockProps } from '@githubnext/blocks'

import { getTSVersion, type TSVersion } from './typescript'

export async function getConfigFromMetadata(metadata: FileBlockProps['metadata']): Promise<Config> {
  const metadataVersion = metadata.version

  const tsVersion = await getTSVersion(typeof metadataVersion === 'string' ? metadataVersion : undefined)

  return {
    version: tsVersion,
  }
}

export interface Config {
  version: TSVersion
}
