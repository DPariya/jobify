import { generateAccessToken, generateRefreshToken } from './jwtUtils.js';
/**
 * Facade Pattern: Simplifies the authentication response process by
 * encapsulating token generation, secure cookie setup, and user data sanitization.
 * Used to provide a clean and reusable interface for login, register, and refresh routes.
 */
export const sendAuthResponse = (res, user) => {
  const { password, _id, __v, ...rest } = user.toObject();
  const safeUser = { ...rest, userId: _id };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set secure cookie for refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    user: safeUser,
    accessToken,
  });
};
