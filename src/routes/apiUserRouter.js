import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { login, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const currUser = await User.create({ login, pass: hashedPass });
    req.session.userId = currUser.id;
    req.session.userLogin = currUser.login;
    //   res.sendStatus(200);
    res.json({ name: currUser.login });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { login, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { login } });
    const compare = await bcrypt.compare(password, currUser.pass);
    if (compare) {
      req.session.userId = currUser.id;
      req.session.userLogin = currUser.login;
      // res.sendStatus(200);
      res.json({ name: currUser.login });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error.message);
  }
});
router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
