export function isLocalStorageAvailable() {
  try {
    return typeof localStorage !== `undefined`
  } catch {
    return false
  }
}
