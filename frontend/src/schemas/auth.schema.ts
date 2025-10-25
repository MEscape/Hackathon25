import { z } from 'zod';

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string().default('Bearer'),
});

export const UserSchema = z.object({
  sub: z.string(), // Keycloak internal UUID
  preferred_username: z.string(),
  email: z.string().email(),
  given_name: z.string(),
  family_name: z.string(),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  tokens: AuthTokensSchema,
});

export const RefreshTokenResponseSchema = AuthTokensSchema;

// Type exports
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type User = z.infer<typeof UserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
