function authCheck(req, res, next) {
  if (!req.session.userLogin) return res.sendStatus(401);
  return next();
}
export default authCheck;
