let tsReleases: TypeScriptReleases | undefined

export async function getTSVersion(preference?: string) {
  const { versions } = await getTSReleases()

  if (preference && versions.includes(preference)) {
    return preference
  }

  const version = versions.at(-1)

  if (version) {
    return version
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

    return tsReleases
  } catch (error) {
    throw new Error('Failed to fetch TypeScript releases.', { cause: error })
  }
}

function isValidTSReleases(releases: unknown): releases is TypeScriptReleases {
  return (
    releases !== undefined && typeof releases === 'object' && Array.isArray((releases as TypeScriptReleases).versions)
  )
}

interface TypeScriptReleases {
  versions: string[]
}
