import express from 'express';
import path from 'path';
import session from 'express-session';
import store from 'session-file-store';
import dotenv from 'dotenv';
import axios from 'axios';
import jsxRender from './utils/jsxRender';
import apiUserRouter from './routes/apiUserRouter';
import apiPostRouter from './routes/apiPostRouter';
import { Post, User } from './db/models';
import authCheck from './middlewares/authCheck';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.engine('js', jsxRender);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'components'));
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'oh klahoma', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(session(sessionConfig));

app.use(async (req, res, next) => {
  const allPosts = await Post.findAll({ include: { model: User, attributes: ['login'] } });
  res.locals.allPosts = allPosts;
  res.locals.path = req.originalUrl;
  res.locals.userLogin = req.session?.userLogin;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  //   const initState = { bla: 'hello' };
  res.render('Layout', { bla: 'hello' });
});

app.get('/fact', async (req, res) => {
  const response = await axios.get('http://dog-api.kinduff.com/api/facts');
  res.json({ fact: response.data });
});

app.get('/posts', async (req, res) => {
  res.render('Layout');
});

app.get('/another', (req, res) => {
  res.render('Layout');
});
app.use('/api/v1/users', apiUserRouter);
app.use(authCheck);
app.use('/api/v1/posts', apiPostRouter);

app.listen(PORT);
