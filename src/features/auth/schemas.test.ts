import { describe, expect, it } from 'vitest'
import { forgotPasswordSchema, logInSchema, resetPasswordSchema, signUpSchema } from './schemas'

const validSignUp = {
  displayName: 'Alex Rivera',
  email: 'alex@example.edu',
  studentStatus: 'incoming',
  password: 'correct-horse',
  confirmPassword: 'correct-horse',
}

function issuePaths(result: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) {
  return result.error?.issues.map((issue) => issue.path.join('.')) ?? []
}

describe('signUpSchema', () => {
  it('accepts valid input and trims text fields', () => {
    const result = signUpSchema.safeParse({ ...validSignUp, displayName: '  Alex  ', email: ' alex@example.edu ' })
    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({ displayName: 'Alex', email: 'alex@example.edu' })
  })

  it.each([
    ['displayName', { displayName: 'A' }],
    ['displayName', { displayName: 'x'.repeat(51) }],
    ['email', { email: 'not-an-email' }],
    ['studentStatus', { studentStatus: 'alumni' }],
    ['password', { password: 'short', confirmPassword: 'short' }],
    ['password', { password: 'x'.repeat(73), confirmPassword: 'x'.repeat(73) }],
    ['confirmPassword', { confirmPassword: 'different-password' }],
  ])('rejects an invalid %s', (field, override) => {
    const result = signUpSchema.safeParse({ ...validSignUp, ...override })
    expect(result.success).toBe(false)
    expect(issuePaths(result)).toContain(field)
  })
})

describe('logInSchema', () => {
  it('requires an email and a password', () => {
    const result = logInSchema.safeParse({ email: '', password: '' })
    expect(issuePaths(result)).toEqual(expect.arrayContaining(['email', 'password']))
  })
})

describe('forgotPasswordSchema', () => {
  it('validates the email format', () => {
    expect(forgotPasswordSchema.safeParse({ email: 'alex@example.edu' }).success).toBe(true)
    expect(forgotPasswordSchema.safeParse({ email: 'alex@' }).success).toBe(false)
  })
})

describe('resetPasswordSchema', () => {
  it('requires matching passwords', () => {
    const result = resetPasswordSchema.safeParse({ password: 'new-password', confirmPassword: 'other-password' })
    expect(issuePaths(result)).toEqual(['confirmPassword'])
  })
})
