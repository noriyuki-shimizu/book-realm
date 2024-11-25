/** パスワードポリシーにおける正規表現（大文字が必要/小文字が必要/特殊文字が必要/数字が必要） */
export const PASSWORD_POLICY_REGEX = {
  requiresUppercase: /(?=.*[A-Z])/,
  requiresLowercase: /(?=.*[a-z])/,
  requiresSpecialCharacter: /(?=.*[!@#$%^&*(),.?":{}|<>_\\-])/,
  requiresDigit: /(?=.*\d)/
}

/** 数値かの正規表現（空文字も許容） */
export const INTEGER_PATTERN_REGEX = /^-?\d+$|^$/

/** 日付かの正規表現（空文字も許容） */
export const DATE_PATTERN_REGEX = /^\d{4}\.\d{2}\.\d{2}$|^$/
