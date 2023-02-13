let tsReleases: TypeScriptReleases | undefined

export async function getLatestTSVersion() {
  const { versions } = await getTSReleases()

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
    tsReleases = (await res.json()) as TypeScriptReleases

    return tsReleases
  } catch (error) {
    throw new Error('Failed to fetch TypeScript releases.', { cause: error })
  }
}

interface TypeScriptReleases {
  versions: string[]
}
