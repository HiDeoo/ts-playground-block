let tsReleases: TSReleases | undefined

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
      versions: [...tsReleases.versions.reverse()],
    }
  } catch (error) {
    throw new Error('Failed to fetch TypeScript releases.', { cause: error })
  }
}

function isValidTSReleases(releases: unknown): releases is TSReleases {
  return releases !== undefined && typeof releases === 'object' && Array.isArray((releases as TSReleases).versions)
}

export interface TSVersion {
  available: string[]
  current: string
}

interface TSReleases {
  versions: string[]
}
