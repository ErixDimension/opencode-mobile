export async function resolveConnectionPassword(
  connectionId: string | null | undefined,
  enteredPassword: string | null | undefined,
  getSavedPassword: (key: string) => Promise<string | null>,
  prefix = "opencode_password_",
): Promise<string | null> {
  // A newly entered password takes precedence over the saved one.
  if (enteredPassword) return enteredPassword

  // Without an ID, there is no saved credential to look up.
  if (!connectionId) return null

  return getSavedPassword(`${prefix}${connectionId}`)
}
