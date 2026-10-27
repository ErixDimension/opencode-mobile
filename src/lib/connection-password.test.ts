import { test } from "node:test"
import assert from "node:assert/strict"
import { resolveConnectionPassword } from "./connection-password.ts"

test("blank edit password reuses the saved password for that connection", async () => {
  const keys: string[] = []

  const result = await resolveConnectionPassword(
    "conn-123",
    undefined,
    async (key) => {
      keys.push(key)
      return "saved-secret"
    },
  )

  assert.equal(result, "saved-secret")
  assert.deepEqual(keys, ["opencode_password_conn-123"])
})

test("entered password takes precedence without reading SecureStore", async () => {
  let reads = 0

  const result = await resolveConnectionPassword(
    "conn-123",
    "new-secret",
    async () => {
      reads++
      return "saved-secret"
    },
  )

  assert.equal(result, "new-secret")
  assert.equal(reads, 0)
})

test("missing connection ID and password does not read SecureStore", async () => {
  let reads = 0

  const result = await resolveConnectionPassword(
    undefined,
    undefined,
    async () => {
      reads++
      return "should-not-be-used"
    },
  )

  assert.equal(result, null)
  assert.equal(reads, 0)
})

test("returns null when SecureStore has no saved password", async () => {
  const result = await resolveConnectionPassword(
    "conn-empty",
    undefined,
    async () => null,
  )

  assert.equal(result, null)
})
