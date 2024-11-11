import fs from 'fs'

/**
 * Create a service account file for Google Cloud Functions
 */
export const createServiceAccount = (): void => {
  const outputDir = import.meta.env.NODE_ENV === 'production' ? '.vercel/output/static/_nuxt/' : ''
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(
    `${outputDir}${process.env.GOOGLE_APPLICATION_CREDENTIALS ?? 'service-account.json'}`,
    `{
  "type": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_TYPE}",
  "project_id": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_PROJECT_ID}",
  "private_key_id": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_PRIVATE_KEY_ID}",
  "private_key": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_PRIVATE_KEY}",
  "client_email": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_CLIENT_EMAIL}",
  "client_id": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_CLIENT_ID}",
  "auth_uri": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_AUTH_URI}",
  "token_uri": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_TOKEN_URI}",
  "auth_provider_x509_cert_url": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_AUTH_PROVIDER_CERT_URL}",
  "client_x509_cert_url": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_CLIENT_CERT_URL}",
  "universe_domain": "${process.env.GOOGLE_APPLICATION_CREDENTIAL_UNIVERSE_DOMAIN}"
}`
  )
}
