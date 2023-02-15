import { type createTypeScriptSandbox } from '@typescript/sandbox'

let tsReleases: TSReleases | undefined

// https://github.com/microsoft/TypeScript-Website/blob/4a670b334df7be35c480f640009ce698a7bab02b/packages/playground/src/index.ts#LL295C3-L295C79
const unsupportedTsVersions = new Set(['3.1.6', '3.0.1', '2.8.1', '2.7.2', '2.4.1'])

export async function getTSVersion(preferredVersion?: string): Promise<TSVersion> {
  const { versions } = await getTSReleases()

  if (preferredVersion && versions.includes(preferredVersion)) {
    return { available: versions, current: preferredVersion }
  }

  const version = versions.at(0)

  if (version) {
    return { available: versions, current: version }
  }

  throw new Error('Failed to get latest TypeScript version.')
}

export function tsVersionSupportsInlayHints(version: string) {
  const [tsMajor, tsMinor] = version.split('.')

  return (
    (tsMajor && Number.parseInt(tsMajor) > 4) ||
    (tsMajor && tsMinor && Number.parseInt(tsMajor) === 4 && Number.parseInt(tsMinor) >= 6)
  )
}

async function getTSReleases() {
  if (tsReleases) {
    return tsReleases
  }

  try {
    const res = await fetch('https://typescript.azureedge.net/indexes/releases.json')
    tsReleases = await res.json()

    if (!isValidTSReleases(tsReleases)) {
      throw new Error('Failed to parse TypeScript releases.')
    }

    return {
      versions: filterUnsupportedTSVersions([...tsReleases.versions.reverse()]),
    }
  } catch (error) {
    throw new Error('Failed to fetch TypeScript releases.', { cause: error })
  }
}

function filterUnsupportedTSVersions(versions: TSReleases['versions']) {
  return versions.filter((version) => !unsupportedTsVersions.has(version))
}

function isValidTSReleases(releases: unknown): releases is TSReleases {
  return releases !== undefined && typeof releases === 'object' && Array.isArray((releases as TSReleases).versions)
}

export type TSSandbox = ReturnType<typeof createTypeScriptSandbox>

export interface TSVersion {
  available: string[]
  current: string
}

interface TSReleases {
  versions: string[]
}
