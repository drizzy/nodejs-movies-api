import jwt from 'jsonwebtoken';

/**
 * It takes a user object as an argument and returns a signed token with the user's id and role
 * @param user - The user object that we want to sign the token for.
 * @returns A token
 */
const tokenSign = (user) => 
{
  return jwt.sign({
    _id: user._id,
    rol: user.rol
  }, 
  process.env.JWT_SECRET, 
  {
    expiresIn: process.env.JWT_EXPIRE
  }
  )

}

/**
 * It takes a token, and if it's valid, it returns the decoded token. If it's not valid, it returns
 * null
 * @param token - The token to be verified.
 * @returns The token is being returned.
 */
const tokenVerify = (token) =>
{
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

/**
 * It takes a token and returns the decoded token
 * @param token - The token to decode.
 * @returns The decoded token.
 */
const tokenDecode = (token) =>
{
  return jwt.decode(token, null);
}

export { tokenSign, tokenVerify, tokenDecode };