const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

dotenv.config();
const app = express(); // app 객체 생성
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
// req.body 정상 작동을 위한 코드
app.use(express.json()); // json 형식 데이터 처리
app.use(express.urlencoded({ extended: true })); // form 형식 데이터 처리
app.use(
  cors({
    origin: true, // 요청 주소 (or http://localhost:3000)
    credentials: true, // 쿠키 교환
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 암호화 secret
    cookie: {
      httpOnly: true,
      secure: false, // https를 쓸 때 true
    },
    name: 'rnbck',
  })
);
app.use(passport.initialize());
app.use(passport.session()); // passport.session()은 expressSession() 아래에 적어야 함1

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

// 서버 포트번호 설정
app.listen(3065, () => {
  console.log('server is running on localhost:3065');
});
