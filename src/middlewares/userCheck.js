import { Post } from '../db/models';

async function userCheck(req, res, next) {
  const { id } = req.params;
  const currPost = await Post.findByPk(id);
  if (req.session.userId !== currPost.author) return res.sendStatus(401);
  return next();
}
export default userCheck;
