/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

function restrict(role = 'user') {
  return async (req, res, next) => {
    const authError = {
      you: "shall not pass!"
    }
    try {
      const token = req.cookies.token
      if(!token) {
        return res.status(401).json(authError)
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err || decodedPayload.userRole !== role) {
          return res.status(401).json(authError)
        }
        req.token = decodedPayload
        next()
      })
    } catch(err) {
      next (err)
    }
  }
}
module.exports = restrict
