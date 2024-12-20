import { StatusCode } from '@/enums/common/http/statusCode'

/** Firebase Error Status Code Enum */
export const FirebaseErrorStatusCode = {
  // Firebase Storage Error Codes
  'storage/object-not-found': StatusCode.STATUS_CODE_NOT_FOUND,
  'storage/unauthorized': StatusCode.STATUS_CODE_UNAUTHORIZED,
  'storage/canceled': StatusCode.STATUS_CODE_REQUEST_TIMEOUT,
  'storage/unknown': StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
  'storage/quota-exceeded': StatusCode.STATUS_CODE_FORBIDDEN,
  'storage/invalid-checksum': StatusCode.STATUS_CODE_BAD_REQUEST,
  'storage/retry-limit-exceeded': StatusCode.STATUS_CODE_TOO_MANY_REQUESTS,
  'storage/invalid-event-name': StatusCode.STATUS_CODE_BAD_REQUEST,
  'storage/invalid-url': StatusCode.STATUS_CODE_BAD_REQUEST,
  'storage/invalid-argument': StatusCode.STATUS_CODE_BAD_REQUEST,
  'storage/no-default-bucket': StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
  'storage/cannot-slice-blob': StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
  'storage/server-file-wrong-size': StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
  // Firebase Authentication Error Codes
  'auth/claims-too-large': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/email-already-exists': StatusCode.STATUS_CODE_CONFLICT,
  'auth/id-token-expired': StatusCode.STATUS_CODE_UNAUTHORIZED,
  'auth/id-token-revoked': StatusCode.STATUS_CODE_UNAUTHORIZED,
  'auth/insufficient-permission': StatusCode.STATUS_CODE_FORBIDDEN,
  'auth/internal-error': StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
  'auth/invalid-argument': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-claims': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-continue-uri': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-creation-time': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-credential': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-disabled-field': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-display-name': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-dynamic-link-domain': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-email': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-email-verified': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-algorithm': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-block-size': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-derived-key-length': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-key': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-memory-cost': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-parallelization': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-rounds': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-hash-salt-separator': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-id-token': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-last-sign-in-time': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-page-token': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-password': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-password-hash': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-password-salt': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-phone-number': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-photo-url': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-provider-data': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-provider-id': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-oauth-responsetype': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-session-cookie-duration': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-uid': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/invalid-user-import': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/maximum-user-count-exceeded': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-android-pkg-name': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-continue-uri': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-hash-algorithm': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-ios-bundle-id': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-uid': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/missing-oauth-client-secret': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/operation-not-allowed': StatusCode.STATUS_CODE_FORBIDDEN,
  'auth/phone-number-already-exists': StatusCode.STATUS_CODE_CONFLICT,
  'auth/project-not-found': StatusCode.STATUS_CODE_NOT_FOUND,
  'auth/reserved-claims': StatusCode.STATUS_CODE_BAD_REQUEST,
  'auth/session-cookie-expired': StatusCode.STATUS_CODE_UNAUTHORIZED,
  'auth/session-cookie-revoked': StatusCode.STATUS_CODE_UNAUTHORIZED,
  'auth/too-many-requests': StatusCode.STATUS_CODE_TOO_MANY_REQUESTS,
  'auth/uid-already-exists': StatusCode.STATUS_CODE_CONFLICT,
  'auth/unauthorized-continue-uri': StatusCode.STATUS_CODE_FORBIDDEN,
  'auth/user-not-found': StatusCode.STATUS_CODE_NOT_FOUND
}

/** Firebase Error Status Code Enum Type */
export type FirebaseErrorStatusCode = (typeof FirebaseErrorStatusCode)[keyof typeof FirebaseErrorStatusCode]
