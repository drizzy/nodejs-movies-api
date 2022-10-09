/**
 * It takes a response object, a message, and a code, and returns a JSON object with the message and
 * code
 * @param res - The response object
 * @param [message=A problem has occurred!] - The message you want to send to the user.
 * @param [code=409] - The HTTP status code.
 */
const httpError = (res, message = 'A problem has occurred!', code = 409) => {
  
  res.status(code).json({error: message});

}

export { httpError };