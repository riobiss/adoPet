import crypto from "crypto"

export const encryptedPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.createHmac("sha256", salt)
  hash.update(password)
  return hash.digest("hex")
}
