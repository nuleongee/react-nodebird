const express = require('express');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

const app = express(); // app 객체 생성
db.sequelize.sync();

// req.body 정상 작동을 위한 코드
app.use(express.json()); // json 형식 데이터 처리
app.use(express.urlencoded({ extended: true })); // form 형식 데이터 처리

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

// 서버 포트번호 설정
app.listen(3065, () => {
  console.log('server is running on localhost:3065');
});
