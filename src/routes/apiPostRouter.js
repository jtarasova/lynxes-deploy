import express from 'express';
import { Post, User } from '../db/models';
import userCheck from '../middlewares/userCheck';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title } = req.body;
  const currPost = await Post.create({ title, author: req.session.userId });
  const postWithAuthor = await Post.findOne({ where: { id: currPost.id }, include: User });
  console.log(postWithAuthor.User);
  res.json(postWithAuthor);
});

router.delete('/:id', userCheck, async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { id } });
  res.sendStatus(200);
});

export default router;
