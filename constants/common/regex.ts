/** パスワードポリシーにおける正規表現（大文字が必要/小文字が必要/特殊文字が必要/数字が必要） */
export const PASSWORD_POLICY_REGEX = {
  requiresUppercase: /(?=.*[A-Z])/,
  requiresLowercase: /(?=.*[a-z])/,
  requiresSpecialCharacter: /(?=.*[!@#$%^&*(),.?":{}|<>_\\-])/,
  requiresDigit: /(?=.*\d)/
}
